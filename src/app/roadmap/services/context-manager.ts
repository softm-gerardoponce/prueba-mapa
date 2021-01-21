//Contiene el contexto del componente de Angular. Se usa para llamar a funciones del componente
export let context: any;

export function setContext(ctx: any){
    context = ctx;
}