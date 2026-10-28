export const PYTHON_CODE_TWO_INPUTS = `import tkinter as tk

def calcular(operacao):
    """
    Função disparada pelos botões de operação (+, -, *, /).
    Captura os valores dos campos, valida, calcula e atualiza a interface.
    """
    try:
        # 1. CAPTURA: Lê o que foi digitado em cada campo (Entry)
        texto1 = entrada_num1.get().strip().replace(',', '.')
        texto2 = entrada_num2.get().strip().replace(',', '.')

        # Validação de campos vazios
        if not texto1 or not texto2:
            rotulo_resultado.config(
                text="Aviso: Digite os dois números!",
                fg="#d97706"
            )
            return

        # 2. CONVERSÃO: Transforma o texto (string) em número decimal (float)
        num1 = float(texto1)
        num2 = float(texto2)

        # 3. LÓGICA E TRATAMENTO DA OPERAÇÃO
        if operacao == '+':
            resultado = num1 + num2
        elif operacao == '-':
            resultado = num1 - num2
        elif operacao == '*':
            resultado = num1 * num2
        elif operacao == '/':
            # Tratamento especial: Divisão por Zero
            if num2 == 0:
                rotulo_resultado.config(
                    text="Erro: Divisão por zero!",
                    fg="#dc2626"
                )
                return
            resultado = num1 / num2
        else:
            return

        # 4. FORMATAÇÃO: Exibe como inteiro se não tiver decimais
        if resultado.is_integer():
            texto_formatado = f"{int(resultado)}"
        else:
            texto_formatado = f"{resultado:.4f}".rstrip('0').rstrip('.')

        # 5. ATUALIZAÇÃO DA TELA: Altera o texto do Label
        rotulo_resultado.config(
            text=f"Resultado: {texto_formatado}",
            fg="#059669"
        )

    except ValueError:
        # Captura erro quando o usuário digita letras ou caracteres inválidos
        rotulo_resultado.config(
            text="Erro: Digite apenas números válidos!",
            fg="#dc2626"
        )

def limpar():
    """Limpa os campos de texto e redefine a mensagem inicial."""
    entrada_num1.delete(0, tk.END)
    entrada_num2.delete(0, tk.END)
    rotulo_resultado.config(
        text="Digite os números e clique em uma operação",
        fg="#64748b"
    )
    entrada_num1.focus_set()

# ==========================================
# 1. CRIAÇÃO DA JANELA PRINCIPAL
# ==========================================
janela = tk.Tk()
janela.title("Calculadora Básica - Python Tkinter")
janela.geometry("380x440")
janela.resizable(False, False)
janela.configure(bg="#f8fafc")

# Título no topo da janela
rotulo_titulo = tk.Label(
    janela,
    text="Calculadora Básica",
    font=("Helvetica", 15, "bold"),
    bg="#f8fafc",
    fg="#0f172a"
)
rotulo_titulo.pack(pady=(20, 15))

# ==========================================
# 2. CAMPOS DE ENTRADA (ENTRY)
# ==========================================
# Campo para o Primeiro Número
rotulo_num1 = tk.Label(janela, text="Primeiro Número:", font=("Helvetica", 10), bg="#f8fafc", fg="#334155")
rotulo_num1.pack(anchor="w", padx=35)
entrada_num1 = tk.Entry(janela, font=("Helvetica", 12), justify="center", bd=1, relief="solid")
entrada_num1.pack(fill="x", padx=35, pady=(4, 12), ipady=4)
entrada_num1.focus_set()

# Campo para o Segundo Número
rotulo_num2 = tk.Label(janela, text="Segundo Número:", font=("Helvetica", 10), bg="#f8fafc", fg="#334155")
rotulo_num2.pack(anchor="w", padx=35)
entrada_num2 = tk.Entry(janela, font=("Helvetica", 12), justify="center", bd=1, relief="solid")
entrada_num2.pack(fill="x", padx=35, pady=(4, 16), ipady=4)

# ==========================================
# 3. BOTÕES DE OPERAÇÃO (+, -, *, /)
# ==========================================
frame_botoes = tk.Frame(janela, bg="#f8fafc")
frame_botoes.pack(pady=5)

# Estilo compartilhado para os 4 botões de cálculo
estilo_op = {
    "font": ("Helvetica", 13, "bold"),
    "width": 4,
    "bg": "#0284c7",
    "fg": "#ffffff",
    "activebackground": "#0369a1",
    "activeforeground": "#ffffff",
    "relief": "flat",
    "cursor": "hand2"
}

# Botões com comandos usando função lambda para passar a operação
btn_soma = tk.Button(frame_botoes, text="+", command=lambda: calcular('+'), **estilo_op)
btn_soma.grid(row=0, column=0, padx=4)

btn_sub = tk.Button(frame_botoes, text="-", command=lambda: calcular('-'), **estilo_op)
btn_sub.grid(row=0, column=1, padx=4)

btn_mult = tk.Button(frame_botoes, text="×", command=lambda: calcular('*'), **estilo_op)
btn_mult.grid(row=0, column=2, padx=4)

btn_div = tk.Button(frame_botoes, text="÷", command=lambda: calcular('/'), **estilo_op)
btn_div.grid(row=0, column=3, padx=4)

# ==========================================
# 4. BOTÃO LIMPAR E ÁREA DO RESULTADO
# ==========================================
btn_limpar = tk.Button(
    janela,
    text="Limpar Campos",
    font=("Helvetica", 10, "bold"),
    bg="#e2e8f0",
    fg="#334155",
    activebackground="#cbd5e1",
    relief="flat",
    cursor="hand2",
    command=limpar
)
btn_limpar.pack(fill="x", padx=35, pady=(14, 12), ipady=4)

# Caixa visual para destacar o resultado
frame_resultado = tk.Frame(janela, bg="#ffffff", bd=1, relief="solid")
frame_resultado.pack(fill="x", padx=35, pady=(5, 20), ipady=12)

rotulo_resultado = tk.Label(
    frame_resultado,
    text="Digite os números e clique em uma operação",
    font=("Helvetica", 11, "bold"),
    bg="#ffffff",
    fg="#64748b",
    wraplength=290
)
rotulo_resultado.pack(padx=10)

# ==========================================
# 5. LOOP PRINCIPAL DA INTERFACE
# ==========================================
janela.mainloop()
`;

export const PYTHON_CODE_KEYPAD = `import tkinter as tk

expressao = ""

def clicar_botao(valor):
    """Acrescenta o número ou operador clicado à expressão atual."""
    global expressao
    expressao += str(valor)
    variavel_tela.set(expressao)

def calcular():
    """Avalia com segurança matemática a expressão e trata erros."""
    global expressao
    try:
        # Previne divisão por zero expressa como /0
        if '/0' in expressao:
            variavel_tela.set("Erro: Divisão por zero!")
            expressao = ""
            return

        # Avaliação da expressão matemática
        resultado = eval(expressao)
        
        # Formatação limpa de inteiros e decimais
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
        elif isinstance(resultado, float):
            resultado = round(resultado, 4)

        variavel_tela.set(str(resultado))
        expressao = str(resultado)
    except ZeroDivisionError:
        variavel_tela.set("Erro: Divisão por zero!")
        expressao = ""
    except Exception:
        variavel_tela.set("Erro de sintaxe")
        expressao = ""

def limpar():
    """Reseta o display e o estado da calculadora."""
    global expressao
    expressao = ""
    variavel_tela.set("0")

# Janela Principal
janela = tk.Tk()
janela.title("Calculadora Clássica - Tkinter")
janela.geometry("320x420")
janela.resizable(False, False)
janela.configure(bg="#0f172a")

# Variável de controle do Display
variavel_tela = tk.StringVar(value="0")

# Display digital
display = tk.Entry(
    janela,
    textvariable=variavel_tela,
    font=("Helvetica", 20, "bold"),
    justify="right",
    bd=0,
    bg="#1e293b",
    fg="#38bdf8",
    relief="flat"
)
display.pack(fill="x", padx=16, pady=(20, 15), ipady=12)

# Grade de Botões
frame_grade = tk.Frame(janela, bg="#0f172a")
frame_grade.pack(padx=16, pady=5)

botoes = [
    ('C', limpar, "#ef4444"), ('/', lambda: clicar_botao('/'), "#0284c7"),
    ('*', lambda: clicar_botao('*'), "#0284c7"), ('-', lambda: clicar_botao('-'), "#0284c7"),
    ('7', lambda: clicar_botao(7), "#334155"), ('8', lambda: clicar_botao(8), "#334155"),
    ('9', lambda: clicar_botao(9), "#334155"), ('+', lambda: clicar_botao('+'), "#0284c7"),
    ('4', lambda: clicar_botao(4), "#334155"), ('5', lambda: clicar_botao(5), "#334155"),
    ('6', lambda: clicar_botao(6), "#334155"), ('=', calcular, "#10b981"),
    ('1', lambda: clicar_botao(1), "#334155"), ('2', lambda: clicar_botao(2), "#334155"),
    ('3', lambda: clicar_botao(3), "#334155"), ('0', lambda: clicar_botao(0), "#334155"),
]

for i, (texto, comando, cor) in enumerate(botoes):
    linha = i // 4
    coluna = i % 4
    btn = tk.Button(
        frame_grade,
        text=texto,
        font=("Helvetica", 13, "bold"),
        width=5,
        height=2,
        bg=cor,
        fg="#ffffff",
        relief="flat",
        cursor="hand2",
        command=comando
    )
    btn.grid(row=linha, column=coluna, padx=3, pady=3)

janela.mainloop()
`;

export interface GuideSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  concepts: {
    name: string;
    description: string;
    codeSnippet: string;
    tips: string;
  }[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "componentes",
    number: "01",
    title: "Principais Componentes da Interface (Tkinter)",
    summary: "Como a tela gráfica é montada usando blocos construtivos nativos do Python.",
    concepts: [
      {
        name: "Janela Principal (tk.Tk)",
        description: "É o contêiner raiz de tudo. Cria o processo da janela do sistema operacional, onde configuramos título com .title(), tamanho inicial com .geometry() e cor de fundo.",
        codeSnippet: `janela = tk.Tk()
janela.title("Calculadora Básica")
janela.geometry("380x440")`,
        tips: "Sem o tk.Tk(), nenhum outro componente pode existir na tela."
      },
      {
        name: "Campos de Entrada (tk.Entry)",
        description: "São as caixas de texto onde o usuário digita os números. Possuem métodos próprios para ler o conteúdo (.get()) e apagar caracteres (.delete()).",
        codeSnippet: `entrada_num1 = tk.Entry(janela, font=("Helvetica", 12))
entrada_num1.pack()`,
        tips: "O Entry sempre retorna o que foi digitado em formato de texto (string)."
      },
      {
        name: "Botões de Ação (tk.Button)",
        description: "Elementos clicáveis que conectam a interface gráfica ao código Python através do parâmetro command=..., acionando uma função quando pressionados.",
        codeSnippet: `btn_soma = tk.Button(
    janela,
    text="+",
    command=lambda: calcular('+')
)`,
        tips: "Usamos 'lambda' para conseguir passar parâmetros para a função no clique."
      },
      {
        name: "Rótulos Informativos (tk.Label)",
        description: "Exibem textos fixos (como instruções e títulos) ou dinâmicos (como a mensagem de resultado e os avisos de erro).",
        codeSnippet: `rotulo_resultado = tk.Label(janela, text="Aguardando...")
rotulo_resultado.pack()`,
        tips: "Podemos alterar o texto de um Label a qualquer momento com o método .config(text=...)."
      },
      {
        name: "Loop de Eventos (janela.mainloop())",
        description: "Mantém a janela aberta e ouvindo cliques do mouse, teclas digitadas e solicitações do sistema. É o coração de qualquer aplicação gráfica.",
        codeSnippet: `janela.mainloop() # Última linha executada`,
        tips: "Qualquer código colocado DEPOIS de mainloop() só roda quando o usuário fechar a janela."
      }
    ]
  },
  {
    id: "captura",
    number: "02",
    title: "Captura de Dados e Detecção de Eventos",
    summary: "Como o programa 'escuta' o clique do usuário e lê o que foi digitado nos campos.",
    concepts: [
      {
        name: "O Método .get() dos Campos Entry",
        description: "Para capturar o valor digitado, chamamos entrada.get(). Esse método retorna uma string exatamente com os caracteres digitados no instante do clique.",
        codeSnippet: `texto1 = entrada_num1.get().strip().replace(',', '.')`,
        tips: "Usamos .strip() para remover espaços acidentais e .replace(',', '.') para aceitar vírgula padrão brasileira (ex: 3,5 vira 3.5)."
      },
      {
        name: "Identificando Qual Operação Foi Clicada (command e lambda)",
        description: "Em vez de criar 4 funções separadas (somar, subtrair, multiplicar, dividir), criamos uma única função 'calcular(operacao)'. O botão passa seu símbolo através de uma função anônima lambda.",
        codeSnippet: `btn_soma = tk.Button(..., command=lambda: calcular('+'))
btn_sub  = tk.Button(..., command=lambda: calcular('-'))`,
        tips: "Se você escrevesse command=calcular('+') sem o lambda, a função seria executada imediatamente ao carregar a janela, antes de qualquer clique!"
      }
    ]
  },
  {
    id: "processamento",
    number: "03",
    title: "Processamento da Lógica e Atualização Visual",
    summary: "A jornada da informação: de texto digitado até o cálculo e a atualização em tela.",
    concepts: [
      {
        name: "Conversão de Tipo: str para float",
        description: "Computadores não conseguem somar matematicamente textos. '10' + '5' resultaria em '105' (concatenação). Por isso convertemos com float().",
        codeSnippet: `num1 = float(texto1)  # Converte "12.5" em 12.5
num2 = float(texto2)`,
        tips: "Usamos float em vez de int para permitir cálculos com números decimais."
      },
      {
        name: "Estrutura Condicional (if / elif / else)",
        description: "O Python inspeciona o parâmetro 'operacao' recebido e decide qual ramo aritmético executar (+, -, *, /).",
        codeSnippet: `if operacao == '+':
    resultado = num1 + num2
elif operacao == '-':
    resultado = num1 - num2`,
        tips: "Cada ramo executa apenas a fórmula correspondente, garantindo isolamento da lógica."
      },
      {
        name: "Atualização da Interface com .config()",
        description: "Diferente do print() que apenas escreve no terminal, interfaces gráficas alteram propriedades visuais do widget dinamicamente com .config().",
        codeSnippet: `rotulo_resultado.config(
    text=f"Resultado: {resultado_formatado}",
    fg="#059669" # Cor verde para sucesso
)`,
        tips: "Alteramos tanto o texto (text) quanto a cor da fonte (fg - foreground) para guiar o olhar do usuário."
      }
    ]
  },
  {
    id: "erros",
    number: "04",
    title: "Tratamento Robusto de Erros (try / except)",
    summary: "Como blindar o aplicativo para que ele nunca feche sozinho por falha do usuário.",
    concepts: [
      {
        name: "Divisão por Zero (Validação Preventiva)",
        description: "Na matemática e na computação, dividir por zero é impossível e gera um erro fatal (ZeroDivisionError). O código verifica previamente se o divisor é zero antes de tentar calcular.",
        codeSnippet: `if operacao == '/':
    if num2 == 0:
        rotulo_resultado.config(text="Erro: Divisão por zero!", fg="#dc2626")
        return
    resultado = num1 / num2`,
        tips: "O comando 'return' interrompe a função imediatamente, impedindo que o Python execute o cálculo proibido."
      },
      {
        name: "Texto Inválido ou Letras (try ... except ValueError)",
        description: "Se o usuário digitar 'banana' ou deixar o campo com caracteres especiais, float('banana') dispara um ValueError. O bloco try/except intercepta o erro suavemente.",
        codeSnippet: `try:
    num1 = float(texto1)
    # ... cálculos ...
except ValueError:
    rotulo_resultado.config(text="Erro: Digite apenas números!", fg="#dc2626")`,
        tips: "Graças ao try/except, a janela continua aberta e funcional, orientando o usuário sobre o que corrigir."
      }
    ]
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que acontece se esquecermos de chamar janela.mainloop() no final do script Python?",
    options: [
      "A janela abre normalmente e calcula em segundo plano.",
      "A janela surge por uma fração de segundo e fecha imediatamente, pois o Python finaliza o script.",
      "O Python emite um erro de compilação antes de iniciar.",
      "Os botões funcionam, mas os campos de texto somem."
    ],
    correctIndex: 1,
    explanation: "O método mainloop() inicia o ciclo infinito de escuta de eventos. Sem ele, o script executa todas as linhas de configuração e encerra sua execução de imediato!"
  },
  {
    id: 2,
    question: "Por que não podemos somar diretamente os valores retornados por entrada_num1.get()?",
    options: [
      "Porque o Tkinter bloqueia operações matemáticas em variáveis locais.",
      "Porque o método .get() retorna strings (texto), e '5' + '3' geraria a junção '53' em vez de 8.",
      "Porque é obrigatório passar os dados para uma lista antes.",
      "Porque .get() só funciona com números negativos."
    ],
    correctIndex: 1,
    explanation: "Exatamente! Todo campo de texto em interfaces gráficas entrega dados como tipo string (texto). É indispensável convertê-los com float() ou int() para operar matematicamente."
  },
  {
    id: 3,
    question: "Como o bloco 'except ValueError:' protege a nossa aplicação?",
    options: [
      "Ele converte automaticamente qualquer letra digitada em zero.",
      "Ele desliga a interface para proteger a memória RAM.",
      "Ele intercepta a falha se o usuário digitar letras ou símbolos inválidos, exibindo um aviso sem derrubar o programa.",
      "Ele calcula a raiz quadrada do número."
    ],
    correctIndex: 2,
    explanation: "Perfeito! Quando o usuário digita algo que não pode virar número (como 'abc'), float('abc') lançaria um ValueError que travaria o app. O except captura o erro e avisa o usuário amigavelmente."
  },
  {
    id: 4,
    question: "Por que usamos 'command=lambda: calcular('+')' em vez de 'command=calcular('+')' no botão?",
    options: [
      "Porque lambda aumenta a velocidade de processamento dos números.",
      "Porque sem o lambda, a função calcular('+') seria executada na hora da criação do botão, antes de qualquer clique.",
      "Porque o Tkinter não aceita funções comuns em botões.",
      "Porque o símbolo '+' é proibido em strings do Python."
    ],
    correctIndex: 1,
    explanation: "Na mosca! Os parênteses () chamam a função imediatamente. Usando lambda criamos uma função temporária que só é disparada no momento exato em que o usuário clica no botão."
  }
];
