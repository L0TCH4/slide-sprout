// 要素の取得
const form = document.getElementById("prompt-form");
const themeInput = document.getElementById("theme");
const slidesInput = document.getElementById("slides");
const resultSection = document.getElementById("result");
const resultText = document.getElementById("result-text");

// 送信時の処理
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const theme = themeInput.value.trim();
    const slides = Number(slidesInput.value);

    if (!validate(theme, slides)) return;

    const prompt = buildPrompt(theme, slides);
    showResult(prompt);
});

// 入力チェック
function validate(theme, slides) {
    const themeError = document.getElementById("theme-error");
    const slidesError = document.getElementById("slides-error");
    let ok = true;

    if (theme === "") {
        showError(themeInput, themeError, "テーマを入力してください。");
        ok = false;
    } else {
        clearError(themeInput, themeError);
    }

    if (!Number.isInteger(slides) || slides < 1 || slides > 50) {
        showError(slidesInput, slidesError, "スライド数は1〜50の整数で入力してください。");
        ok = false;
    } else {
        clearError(slidesInput, slidesError);
    }

    return ok;
}

function showError(input, el, message) {
    el.textContent = message;
    el.hidden = false;
    input.setAttribute("aria-invalid", "true");
}

function clearError(input, el) {
    el.hidden = true;
    input.removeAttribute("aria-invalid");
}

// プロンプトの組み立て
function buildPrompt(theme, slides) {
    // スライド作成に最適なプロンプトの文面を作る
    return `${theme}について、スライド形式のスタイリッシュでモダンなウェブサイトを作ってください。スクロールすると画面が切り替わるような形にしてください。画面サイズに合わせて必ず1スクロールで1画面となるようにしてください。合計で${slides}画面となるようにしてください。ウェブサイトはHTML1枚で作成し、そのコードのみを出力してください。`;
}

// 結果の表示
function showResult(prompt) {
    resultText.value = prompt;
    resultSection.hidden = false;
}

const copyButton = document.getElementById("copy-button");

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(resultText.value);
        copyButton.textContent = "コピーしました";
    } catch (error) {
        copyButton.textContent = "コピーに失敗しました";
    }

    setTimeout(() => {
        copyButton.textContent = "コピーする";
    }, 2000);
});