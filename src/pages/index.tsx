import { Input, Textarea } from "@heroui/input";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function IndexPage() {
  const markdown = `**Thermodynamics – Quick‑Reference Notes**

---

### 1. First Law of Thermodynamics
\[
\Delta U = Q - W
\]

* **$Q$** – Heat added to the system (positive when heat flows **into** the gas).
* **$W$** – Work done **by** the system (positive when the gas expands).
* **$\Delta U$** – Change in internal energy of the gas (depends only on temperature for an ideal gas).

> **Energy bookkeeping:**
> • Heat supplied → may become internal energy **or** do work.
> • If 10 J of heat are added and the gas does 8 J of work, the remaining 2 J appear as ↑ $\Delta U$ (higher molecular kinetic energy).
`;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-full max-w-lg mx-auto text-center justify-center">
          <Input label="YouTube URL" type="url" />
        </div>
        <div className="w-full max-w-lg mx-auto text-left justify-center">
          <div className="mb-2 font-semibold">Summarised notes</div>
          <div className="border rounded p-4 bg-white">
            <ReactMarkdown
              rehypePlugins={[rehypeKatex]}
              remarkPlugins={[remarkMath]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
