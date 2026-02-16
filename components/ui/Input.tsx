import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Input(parames: { labelClass: string | undefined; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; type: string | (string & {}) | undefined; name: string | undefined; placeholder: string | undefined; class: string | undefined; }) {
    return (
        <div>
            <label className={parames.labelClass}>
                {parames.label}
            </label>
            <input
                type={parames.type}
                name={parames.name}
                required
                placeholder={parames.placeholder}
                className={parames.class}
            />
        </div>
    )
}