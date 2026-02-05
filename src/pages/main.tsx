import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import "katex/dist/katex.min.css";

async function createNotes(url: string) {
    const response = await fetch("http://localhost:8080/api/notes/create-notes/oli98", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export default function MainPage() {
    const [url, setUrl] = useState(""); // 1. State for input
    
    const handleCreateNotes = async () => {
        if (url.trim() !== "") {
            try {
                await createNotes(url);
            } catch (error) {
                console.error(error);
            }
        }
    };

    var markdown = String.raw`# Projectile Motion Notes  

## 1.  Scenario – Bob’s “tombstoning”  

- **Given**  
  - Horizontal launch speed: $u = 8\ \text{m s}^{-1}$  
  - Cliff height: $h = 50\ \text{m}$ (downwards)  

- **Approach** – Split the motion into vertical ($y$) and horizontal ($x$) components.  
  - The two components are independent; the **time** $t$ is the same for both.  

### 1.1  Vertical motion  

| Symbol | Meaning |
|--------|---------|
| $u_{y}$ | Initial vertical velocity = $0$ (Bob runs off horizontally) |
| $a_{y}$ | Acceleration = $-9.8\ \text{m s}^{-2}$ (downwards) |
| $s_{y}$ | Vertical displacement = $-50\ \text{m}$ (downwards) |

Use the suvat equation (with $u_{y}=0$):  

$$ s_{y}= \frac{1}{2} a_{y} t^{2} $$  

Solve for $t$:  

$$ t = \sqrt{\frac{2\,s_{y}}{a_{y}}}
      = \sqrt{\frac{2 \times 50}{9.8}}
      \approx 3.19\ \text{s} $$  

*(Take magnitudes when inserting numbers; the sign is handled by the direction convention.)*  

### 1.2  Horizontal motion  

- No horizontal forces → $a_{x}=0$, so speed stays constant: $v_{x}=u = 8\ \text{m s}^{-1}$.  
- Distance travelled (range) $D$:

$$ D = v_{x}\,t = 8 \times 3.19 \approx 25.6\ \text{m} $$  

---

## 2.  Final velocity when Bob hits the water  

- **Horizontal component** remains $v_{x}=8\ \text{m s}^{-1}$.  

- **Vertical component** from $v^{2}=u^{2}+2as$ (with $u_{y}=0$):

$$ v_{y}= \sqrt{2\,|a_{y}|\,|s_{y}|}
        = \sqrt{2 \times 9.8 \times 50}
        \approx 31.3\ \text{m s}^{-1}\ (\text{downwards}) $$  

- **Resultant speed** (Pythagoras):

$$ v = \sqrt{v_{x}^{2}+v_{y}^{2}}
      = \sqrt{8^{2}+31.3^{2}}
      \approx 32.3\ \text{m s}^{-1} $$  

- **Impact angle** $\theta$ measured from the horizontal:

$$ \theta = \tan^{-1}\!\left(\frac{v_{y}}{v_{x}}\right)
          \approx \tan^{-1}\!\left(\frac{31.3}{8}\right)
          \approx 75.7^{\circ} $$  

---

## 3.  Example – Cannon firing at an angle  

- **Given**  
  - Launch speed: $u = 80\ \text{m s}^{-1}$  
  - Launch angle above horizontal: $\alpha = 30^{\circ}$  
  - No air resistance.  

- **Component breakdown**

$$ u_{x}=u\cos\alpha = 80\cos30^{\circ}\approx 69.3\ \text{m s}^{-1} $$  

$$ u_{y}=u\sin\alpha = 80\sin30^{\circ}=40\ \text{m s}^{-1} $$  

- **Vertical motion** (upwards positive)  

  - Acceleration: $a_{y}= -9.8\ \text{m s}^{-2}$.  

  - Time to reach the highest point ($v_{y}=0$):

    $$ t_{\text{up}} = \frac{u_{y}}{g}= \frac{40}{9.8}\approx 4.08\ \text{s} $$  

  - Total flight time (up + down, same launch and landing height):

    $$ t_{\text{total}} = 2t_{\text{up}} \approx 8.16\ \text{s} $$  

- **Horizontal range**

$$ R = u_{x}\,t_{\text{total}}
      \approx 69.3 \times 8.16 \approx 566\ \text{m} $$  

- **Velocity just before impact**  

  - Horizontal component unchanged: $v_{x}=69.3\ \text{m s}^{-1}$.  
  - Vertical component symmetrical: $v_{y}= -40\ \text{m s}^{-1}$.  

  - Resultant speed (same as launch speed when air resistance is ignored):

    $$ v = \sqrt{v_{x}^{2}+v_{y}^{2}} \approx 80\ \text{m s}^{-1} $$  

---

## 4.  Key Take‑aways  

- Projectile motion = independent **vertical** and **horizontal** one‑dimensional motions.  
- **Time** $t$ is the common link; compute it from the vertical motion.  
- With no air resistance, horizontal motion has **constant velocity** ($a_{x}=0$).  
- Use suvat equations for the vertical component; horizontal distance is simply $s = vt$.  
- Final speed is found with the Pythagorean theorem, and impact angle with $\tan^{-1}(v_{y}/v_{x})$.  
- Keep a consistent sign convention (e.g., up = positive, down = negative) when applying the equations.`;

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-full max-w-lg mx-auto flex gap-2 items-end justify-center">
                    <Input
                        label="YouTube URL"
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <Button
                        className={buttonStyles({
                        color: "primary",
                        radius: "full",
                        variant: "shadow",
                        })}
                        onPress={handleCreateNotes}
                    >
                        Create
                    </Button>
                </div>
                <div className="w-full max-w-4xl mx-auto text-left justify-center">
                    <div className="prose max-w-4xl mx-auto">
                        <ReactMarkdown
                            rehypePlugins={[rehypeKatex]}
                            remarkPlugins={[remarkMath, remarkGfm]}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}
