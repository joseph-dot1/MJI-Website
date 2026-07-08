#!/usr/bin/env python3
"""
Super-resolve low-resolution (WhatsApp-compressed) source photos with
Swin2SR real-world x4, then cap the long edge and save. Tiled inference
with reflect-padded overlap so the whole image fits in CPU memory without
visible seams. Detail is reconstructed, not invented — this is a restoration
model, so features are preserved.

Usage: python3 scripts/upscale.py <in.jpg> <out.jpg> [max_long_edge]
"""
import sys
import numpy as np
import onnxruntime as ort
from PIL import Image, ImageOps

MODEL = "/tmp/claude-0/-home-user-MJI-Website/3027b0b6-3e46-58f6-9f8d-93d76baa9278/scratchpad/swin2sr-x4.onnx"
SCALE = 4
WIN = 8            # window size — tile dims must be multiples of this
TILE = 256         # base tile (input px)
OVERLAP = 16       # overlap between tiles (input px)

sess = ort.InferenceSession(MODEL, providers=["CPUExecutionProvider"])
inp = sess.get_inputs()[0].name


def run_tile(t):  # t: HxWx3 float32 [0,1]
    h, w, _ = t.shape
    ph = (WIN - h % WIN) % WIN
    pw = (WIN - w % WIN) % WIN
    if ph or pw:
        t = np.pad(t, ((0, ph), (0, pw), (0, 0)), mode="reflect")
    x = t.transpose(2, 0, 1)[None].astype(np.float32)
    y = sess.run(None, {inp: x})[0][0]
    y = np.clip(y, 0, 1).transpose(1, 2, 0)
    return y[: h * SCALE, : w * SCALE]


def main(src, dst, max_edge=2400):
    # apply EXIF orientation now so the saved file is upright (downstream
    # sharp .rotate() then becomes a harmless no-op on the stripped output)
    pil = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    img = np.asarray(pil, dtype=np.float32) / 255.0
    H, W, _ = img.shape
    out = np.zeros((H * SCALE, W * SCALE, 3), dtype=np.float32)
    acc = np.zeros((H * SCALE, W * SCALE, 1), dtype=np.float32)
    step = TILE - OVERLAP
    ys = list(range(0, H, step))
    xs = list(range(0, W, step))
    for yi in ys:
        for xi in xs:
            y0, x0 = yi, xi
            y1, x1 = min(yi + TILE, H), min(xi + TILE, W)
            sr = run_tile(img[y0:y1, x0:x1])
            # feather the overlap with a cosine window to hide seams
            th, tw = (y1 - y0) * SCALE, (x1 - x0) * SCALE
            wy = np.ones(th); wx = np.ones(tw)
            o = OVERLAP * SCALE
            if y0 > 0:
                wy[:o] = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, o))
            if y1 < H:
                wy[-o:] = 0.5 + 0.5 * np.cos(np.linspace(0, np.pi, o))
            if x0 > 0:
                wx[:o] = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, o))
            if x1 < W:
                wx[-o:] = 0.5 + 0.5 * np.cos(np.linspace(0, np.pi, o))
            wgt = (wy[:, None] * wx[None, :])[:, :, None]
            out[y0 * SCALE:y1 * SCALE, x0 * SCALE:x1 * SCALE] += sr * wgt
            acc[y0 * SCALE:y1 * SCALE, x0 * SCALE:x1 * SCALE] += wgt
    res = out / np.maximum(acc, 1e-6)
    im = Image.fromarray((res * 255 + 0.5).astype(np.uint8))
    # cap long edge (SR at 4x is larger than we need; downscaling sharpens)
    long_edge = max(im.size)
    if long_edge > max_edge:
        s = max_edge / long_edge
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(dst, quality=90)
    print(f"{src} {W}x{H} -> {im.width}x{im.height}  {dst}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 2400)
