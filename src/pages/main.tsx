import { Input, Textarea } from "@heroui/input";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function MainPage() {
  const markdown = String.raw`**# Projectile Motion — Notes**

**## Key Idea**
Projectile motion is analysed by **separating horizontal and vertical components**.
These components are **independent**, except for sharing the same **time** of travel.

**---**

**# Example 1 — Bob Runs Off a Cliff**

Bob runs horizontally off a **50 m** high cliff at **8 m/s**.
We want the horizontal distance **$D$** he travels.

**---**

**## Vertical Motion (Using SUVAT)**

Vertical displacement:
- $s = 50\ \text{m}$ (downwards)
- Initial vertical velocity: $u = 0$
- Acceleration: $a = 9.8\ \text{m/s}^2$
- Unknown: time $t$

Use
$$s = ut + \tfrac{1}{2}at^2.$$

Since $u=0$:
$$s = \tfrac{1}{2}at^2$$
$$2s = at^2$$
$$t = \sqrt{\frac{2s}{a}}$$

Plug in values:
$$t = \sqrt{\frac{2(50)}{9.8}} = 3.19\ \text{s}.$$

**---**

**## Horizontal Motion**

No air resistance → no horizontal forces → **constant speed**.

Use
$$\text{speed} = \frac{\text{distance}}{\text{time}}$$
so
$$D = vt.$$

Thus:
$$D = 8 \times 3.19 = 25.6\ \text{m}.$$

**---**

**# Final Impact Speed**

Horizontal velocity:
- $v_{x} = 8\ \text{m/s}$ (constant)

Vertical final velocity using

$$
v_{y}^2 = u^2 + 2as
$$

with $u = 0$:

$$
v_{y} = \sqrt{2(9.8)(50)} = 31.3\ \text{m/s}.
$$

Total impact speed (Pythagoras):

$$
v = \sqrt{v_{x}^2 + v_{y}^2}
= \sqrt{8^2 + 31.3^2}
= 32.3\ \text{m/s}.
$$

Impact angle $\theta$ below horizontal:

$$
\theta = \tan^{-1}\left(\frac{v_{y}}{v_{x}}\right)
= \tan^{-1}\left(\frac{31.3}{8}\right)
= 75.7^\circ.
$$

**---**

**# Example 2 — Cannon Fired at an Angle**

A cannon fires a projectile at:

- Speed: $80\ \text{m/s}$
- Launch angle: $30^\circ$

**## Resolve the Velocity**

Horizontal component:
$$u_{x} = 80\cos 30^\circ.$$

Vertical component:
$$u_{y} = 80\sin 30^\circ.$$

Numerically:
- $u_{x} = 80\cos 30^\circ = 69.3\ \text{m/s}$
- $u_{y} = 80\sin 30^\circ = 40\ \text{m/s}$

**---**

**## Vertical Motion (Up and Down)**

Upwards is positive:

- Initial vertical velocity: $u_{y} = 40\ \text{m/s}$
- Final vertical velocity on returning to launch height: $v_{y} = -40\ \text{m/s}$
- Acceleration: $a = -9.8\ \text{m/s}^2$

Use
$$v = u + at$$
to find total flight time.

Since $v = -u$ for symmetric flight:
$$-40 = 40 - 9.8t$$
$$t = \frac{80}{9.8} = 8.16\ \text{s}.$$

**---**

**## Horizontal Range**

Horizontal velocity is constant: $u_{x} = 69.3\ \text{m/s}$.

Horizontal distance:
$$R = u_{x} t = 69.3 \times 8.16 = 565.5\ \text{m}.$$

**---**

**# Summary of Method**

1. **Resolve** initial velocity into horizontal and vertical components.
2. **Use SUVAT vertically** to find time, height, or vertical velocity.
3. **Use constant horizontal speed** to find horizontal distance:
   $$D = v_{x} t.$$
4. For final speed, combine components with Pythagoras.
5. For direction, use $\tan^{-1}(\frac{v_{y}}{v_{x}})$.
`;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-full max-w-lg mx-auto text-center justify-center">
          <Input label="YouTube URL" type="url" />
        </div>
        <div className="w-full max-w-4xl mx-auto text-left justify-center">
          <div className="mb-2 font-semibold text-center">Summarised notes</div>
          <div className="prose max-w-4xl mx-auto">
            <ReactMarkdown
              rehypePlugins={[rehypeKatex]}
              remarkPlugins={[remarkMath]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
