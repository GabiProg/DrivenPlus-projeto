export default function PacoteItens({title, index, member}){

    const numero = member;
    const numeroSerializados = JSON.stringify(numero);
    localStorage.setItem("numeroId", numeroSerializados);

    return(
        <>
        <h3>{index + 1}.{title}</h3>
        </>
    );
}