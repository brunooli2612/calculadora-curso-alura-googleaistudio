# 🧮 Calculadora Gráfica em Python com Tkinter

> Projeto didático de calculadora com interface gráfica de usuário (GUI) desenvolvida em **Python 3** utilizando exclusivamente a biblioteca nativa **Tkinter**.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg?logo=python&logoColor=white)
![Tkinter](https://img.shields.io/badge/GUI-Tkinter%20(Nativa)-green.svg)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-orange.svg)
![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen.svg)

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido com foco pedagógico para **iniciantes em programação**, demonstrando na prática como conectar a lógica matemática de um script Python a uma **interface visual amigável e interativa**.

Diferente de scripts executados exclusivamente em linha de comando (terminal), esta aplicação cria uma janela do sistema operacional que reage a cliques do mouse e digitação de dados, aplicando conceitos fundamentais de **programação orientada a eventos** e **tratamento robusto de exceções**.

---

## ✨ Funcionalidades

- ➕ **Adição** (`+`)
- ➖ **Subtração** (`-`)
- ✖️ **Multiplicação** (`×` ou `*`)
- ➗ **Divisão** (`÷` ou `/`)
- 🛡️ **Tratamento de Divisão por Zero**: Validação preventiva que impede travamento do programa caso o divisor seja `0`.
- 🔍 **Validação de Entradas Inválidas**: Bloco `try ... except ValueError` que intercepta letras, caracteres especiais ou campos vazios, exibindo feedback claro ao usuário.
- 🇧🇷 **Suporte a Vírgula e Ponto**: Aceita tanto notação decimal brasileira (`3,5`) quanto padrão internacional (`3.5`).
- 🧹 **Botão de Limpeza**: Limpa os campos de texto, redefine o foco do cursor no primeiro campo e restaura a mensagem inicial.
- 📐 **Formatação Inteligente**: Se o resultado for inteiro (ex: `8.0`), exibe `8`; se tiver casas decimais, formata suavemente sem zeros excessivos.

---

## 🖥️ Layout da Janela (Esquema Visual)

```text
+------------------------------------------+
|  Calculadora Básica - Python Tkinter [X] |
+------------------------------------------+
|                                          |
|            Calculadora Básica            |
|                                          |
|   Primeiro Número:                       |
|   [                  25.5              ] |
|                                          |
|   Segundo Número:                        |
|   [                   2                ] |
|                                          |
|         [ + ]   [ − ]   [ × ]   [ ÷ ]    |
|                                          |
|   [           Limpar Campos            ] |
|                                          |
|   +------------------------------------+ |
|   |          Resultado: 51             | |
|   +------------------------------------+ |
|                                          |
+------------------------------------------+
```

---

## 🛠️ Principais Componentes do Tkinter Utilizados

| Componente | Classe Tkinter | Finalidade no Código |
| :--- | :--- | :--- |
| **Janela Raiz** | `tk.Tk()` | Cria a janela principal, define título com `.title()` e dimensões com `.geometry()`. |
| **Rótulos** | `tk.Label()` | Exibe títulos, textos informativos e a mensagem de resultado. |
| **Campos de Entrada** | `tk.Entry()` | Recebe a digitação do usuário e permite leitura via `.get()` e limpeza via `.delete()`. |
| **Botões de Ação** | `tk.Button()` | Dispara a função `calcular()` através de expressões `lambda` com o operador clicado. |
| **Contêineres** | `tk.Frame()` | Agrupa visualmente os botões em linha e destaca o quadro de resultado. |
| **Loop de Eventos** | `janela.mainloop()` | Mantém a janela ativa, ouvindo eventos do teclado e mouse. |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Ter o **Python 3** instalado em sua máquina ([python.org](https://www.python.org/downloads/)).
> **Nota:** Não é necessário instalar nenhuma biblioteca via `pip`! O **Tkinter** já vem pré-instalado por padrão no Windows e macOS.

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/calculadora-python-tkinter.git
cd calculadora-python-tkinter
```

### 2. Executar o Script

#### No Windows:
```bash
python calculadora.py
```

#### No macOS ou Linux:
```bash
python3 calculadora.py
```

> **Atenção para usuários de Linux (Ubuntu/Debian):** Caso sua instalação mínima do sistema não possua o pacote gráfico do Python, instale com:
> ```bash
> sudo apt install python3-tk
> ```

---

## 💡 Como Funciona a Lógica do Código?

### 1. Captura de Dados com `.get()`
O método `.get()` lê os caracteres digitados no campo `Entry`. Como todo campo de formulário devolve dados em formato de texto (`str`), realizamos a conversão para `float`:
```python
texto1 = entrada_num1.get().strip().replace(',', '.')
num1 = float(texto1)
```

### 2. Passagem de Parâmetros com `lambda`
Para reaproveitar uma única função de cálculo para as 4 operações sem executá-la no momento da criação do botão, usamos funções anônimas `lambda`:
```python
btn_soma = tk.Button(frame_botoes, text="+", command=lambda: calcular('+'))
btn_sub  = tk.Button(frame_botoes, text="-", command=lambda: calcular('-'))
```

### 3. Tratamento de Erros e Exceções
- **Divisão por Zero:**
  ```python
  if operacao == '/':
      if num2 == 0:
          rotulo_resultado.config(text="Erro: Divisão por zero!", fg="#dc2626")
          return
  ```
- **Caracteres Inválidos:**
  ```python
  try:
      num1 = float(texto1)
      num2 = float(texto2)
  except ValueError:
      rotulo_resultado.config(text="Erro: Digite apenas números válidos!", fg="#dc2626")
  ```

---

## 📂 Estrutura de Arquivos Sugerida para o Repositório

```text
├── calculadora.py       # Código-fonte principal com a interface gráfica
├── README.md            # Documentação completa do projeto
└── LICENSE              # Licença MIT
```

---

## 🎓 Conceitos Didáticos Abordados

- Criação e personalização de janelas com **Tkinter**
- Gerenciamento de layout com **pack** e **grid**
- Ciclo de vida de eventos (**Event-Driven Programming**)
- Funções de alta ordem e funções anônimas (**lambda**)
- Conversão e coerção de tipos primitivos (`str` ➔ `float`)
- Tratamento de exceções com blocos `try / except`
- Métodos de manipulação de strings (`strip()`, `replace()`)

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Sinta-se livre para usar, estudar, modificar e compartilhar!

---

*Desenvolvido com dedicação para fins educacionais e estudo de programação com Python.*
