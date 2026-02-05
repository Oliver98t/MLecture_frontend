import { Input, Textarea } from "@heroui/input";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function MainPage() {
  const markdown = String.raw`# **Projectile Motion – Notes (Markdown + KaTeX)**

## **Key Idea**
Projectile motion is split into **independent components**:
- **Horizontal motion** → constant velocity
- **Vertical motion** → accelerated motion under gravity

Time $t$ is **shared** between both components.

---

# **Example: Bob Runs Off a 50 m Cliff**

Bob runs horizontally at $8\,\text{m/s}$ off a cliff of height $50\,\text{m}$.
We want the horizontal distance $D$ travelled.

---

## **1. Vertical Motion (Using SUVAT)**

Known quantities:

- Displacement:
  $s = 50\,\text{m}$
- Initial vertical velocity:
  $u = 0$
- Acceleration due to gravity:
  $a = 9.8\,\text{m/s}^2$
- Time to fall: unknown

Use
$$
s = ut + \frac{1}{2}at^{2}
$$

Since $u = 0$:

$$
s = \frac{1}{2}at^{2}
$$

Solve for $t$:

$$
t^{2} = \frac{2s}{a}
$$

$$
t = \sqrt{\frac{2s}{a}}
$$

Substitute $s=50$, $a=9.8$:

$$
t = \sqrt{\frac{2 \cdot 50}{9.8}} = 3.19\,\text{s}
$$

---

## **2. Horizontal Motion**

No air resistance → no horizontal forces → constant speed.

$$
\text{distance} = \text{speed} \times t
$$

Horizontal speed is constant at $8\,\text{m/s}$:

$$
D = 8 \times 3.19 = 25.6\,\text{m}
$$

So Bob lands **25.6 m** from the cliff.

---

# **Final Velocity When Bob Hits the Water**

### **Horizontal component**
$$
v_{x} = 8\,\text{m/s}
$$

### **Vertical component**
Use:
$$
v^{2} = u^{2} + 2as
$$

With:
- $u = 0$
- $a = 9.8$
- $s = 50$

$$
v = \sqrt{2as}
$$

$$
v = \sqrt{2 \cdot 9.8 \cdot 50}
= 31.3\,\text{m/s} \text{ (downwards)}
$$

### **Resultant speed**
$$
v_{\text{final}} = \sqrt{v_{x}^{2} + v_{y}^{2}}
$$

$$
= \sqrt{8^{2} + 31.3^{2}}
= 32.3\,\text{m/s}
$$

### **Impact angle**
Let $\theta$ be the angle below horizontal:

$$
\tan \theta = \frac{v_{y}}{v_{x}}
$$

$$
\theta = \tan^{-1}\left(\frac{31.3}{8}\right) = 75.7^\circ
$$

---

# **Launching at an Angle (General Case)**

Suppose a projectile is launched at:
- Speed $u$
- Angle $\theta$ above the horizontal

### **Resolve components**

Turning *through* the angle → cosine
Turning *away* → sine

$$
u_{x} = u \cos\theta
$$

$$
u_{y} = u \sin\theta
$$

Horizontal motion has:

$$
a_{x} = 0
$$

Vertical motion has:

$$
a_{y} = -9.8\,\text{m/s}^{2}
$$

### **Example numbers**

If $u = 80\,\text{m/s}$, $\theta = 30^\circ$:

$$
u_{x} = 80 \cos 30^\circ = 69.3\,\text{m/s}
$$

$$
u_{y} = 80 \sin 30^\circ = 40\,\text{m/s}
$$

### **At top and returning to same height**

Final vertical velocity:

$$
v_{y} = -u_{y}
$$

Use vertical SUVAT to find time, then horizontal motion for range.

---

# **Key Principles Summary**

- Vertical and horizontal motions are independent.
- Time $t$ always links the two.
- Horizontal acceleration is zero (ideal model).
- Vertical acceleration is $a = -9.8\,\text{m/s}^2$.
- Resolve angles using:
  - $u_{x} = u \cos\theta$
  - $u_{y} = u \sin\theta$
- Use SUVAT **only vertically**.`;
/*
Convert the following transcript, into notes using markdown with $...$ for inline and $$...$$ for block math suitable for KaTex, for subscript rendering use curly braces for multi-character subscripts (e.g., v_{x} (give the raw string)
*/
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
