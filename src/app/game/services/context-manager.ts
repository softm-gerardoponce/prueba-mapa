//Contiene el contexto del componente de Angular. Se usa para llamar a funciones del componente
export let context;

export function setContext(ctx){
    context = ctx;
}