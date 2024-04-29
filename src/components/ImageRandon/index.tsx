import Image from "next/image";
interface ImageRandonProps {
    alt: string;
    width: number;
    height: number;
    priority: boolean;
}
export default function ImageRandon( { alt, width, height, priority }: ImageRandonProps) {
    return (
        <Image
          className="rounded-full"
          src={`https://www.4devs.com.br/4devs_gerador_imagem.php?acao=gerar_imagem&txt_largura=${width}&txt_altura=${height}&extensao=png&fundo_r=0.06274509803921569&fundo_g=0.996078431372549&fundo_b=0.9568627450980393&texto_r=0&texto_g=0&texto_b=0&texto=${encodeURIComponent(alt)}&tamanho_fonte=5`}
          alt="Next.js Logo"
          width={180}
          height={37}
          fill={false}
        />
    );
}