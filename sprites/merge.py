import os
import sys
from PIL import Image

def spritesheet(prefixo, output="spritesheet.png"):
    # pega todos os arquivos com o prefixo e extensão de imagem
    arquivos = sorted([
        f for f in os.listdir(".")
        if f.startswith(prefixo) and f.lower().endswith((".png", ".jpg", ".jpeg"))
    ])

    if not arquivos:
        print("Nenhuma imagem encontrada com o prefixo:", prefixo)
        return

    # abre todas as imagens
    imagens = [Image.open(f) for f in arquivos]

    # assume que todas têm o mesmo tamanho
    largura, altura = imagens[0].size

    # cria spritesheet com largura somada
    sheet_largura = largura * len(imagens)
    sheet_altura = altura

    sheet = Image.new("RGBA", (sheet_largura, sheet_altura))

    # cola uma ao lado da outra
    for i, img in enumerate(imagens):
        sheet.paste(img, (i * largura, 0))

    sheet.save(output)
    print(f"Spritesheet gerado: {output}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python merge.py <prefixo> <saida>")
        sys.exit(1)

    prefixo = sys.argv[1]
    saida = sys.argv[2]

    spritesheet(prefixo, saida)
