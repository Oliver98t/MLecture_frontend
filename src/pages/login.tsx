import { APIData } from "./APIData";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import "katex/dist/katex.min.css";

export default function Login() {
    const [email, setEmail] = useState<string>(""); // 1. State for input
    const [password, setPassword] = useState<string>("");
    var apiData = new APIData();

    const createNotesHandler = async () => {
        console.log(`${email} ${password}`);
        await apiData.loginUser(email, password);
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-full max-w-lg mx-auto flex gap-2 items-end justify-center">
                    <   Input label="Email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <   Input label="Password"
                        placeholder="Enter your password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })}
                        //onPress={createNotesHandler}
                    >
                        Login
                    </Button>
                    <a href="/.auth/login/aad">Login</a>
                </div>
            </section>
        </DefaultLayout>
    );
}