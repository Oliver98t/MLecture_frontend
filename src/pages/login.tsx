import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";

import DefaultLayout from "@/layouts/default";
import "katex/dist/katex.min.css";

export default function Login() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-full max-w-lg mx-auto flex gap-2 items-end justify-center">

                    <Button
                        className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })}
                        onPress={() => window.location.href = "/.auth/login/aad?post_login_redirect_uri=/main"}
                    >
                        Sign in via Microsoft account
                    </Button>
                </div>
            </section>
        </DefaultLayout>
    );
}