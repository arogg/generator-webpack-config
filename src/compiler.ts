import * as typescript from "typescript";

export function compile(source: string) {
    const result = typescript.transpileModule(source, {
        compilerOptions: {
            module: typescript.ModuleKind.CommonJS,
            target: typescript.ScriptTarget.ES2015
        }
    });
    return result.outputText;
}