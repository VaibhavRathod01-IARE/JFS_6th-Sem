document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const regForm = document.getElementById('regform');
    let resultContainer = document.getElementById('result-container');
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'result-container';
        resultContainer.style.marginTop = '1rem';
        const containerEl = document.querySelector('.container') || regForm.parentElement;
        containerEl.parentNode.insertBefore(resultContainer, containerEl.nextSibling);
    }

    submitBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('name');
        const studentName = (nameInput && nameInput.value) ? nameInput.value.trim() : '';
        const checked = [...document.querySelectorAll('input.subject:checked')];

        if (checked.length === 0) {
            resultContainer.innerHTML = '<p><strong>No subjects selected.</strong></p>';
            resultContainer.classList.remove('result-enter');
            void resultContainer.offsetWidth;
            resultContainer.classList.add('result-enter');
            return;
        }
        const subjectObjs = checked.map(input => {
            const li = input.closest('li');
            let text = '';
            if (li) {
                text = li.textContent.replace(/<\/?data>/gi, '').trim();
            } else {
                text = (input.nextSibling && input.nextSibling.textContent) ? input.nextSibling.textContent.trim() : '';
            }
            // remove any trailing fee in brackets like "(₹1000)" to avoid duplication
            text = text.replace(/\s*\(₹[\d,]+\)\s*$/, '');
            text = text.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
            return { name: text, fee: Number(input.value || 0) };
        });

        const total = subjectObjs.reduce((s, item) => s + (item.fee || 0), 0);
        const itemsHtml = subjectObjs.map(item => `
            <li class="result-item">${escapeHtml(item.name)} (₹${item.fee})</li>
        `).join('');

        resultContainer.innerHTML = `
            <div class="result-inner">
                <p><strong>STUDENT NAME:</strong> ${escapeHtml(studentName || '')}</p>
                <p><strong>SELECTED SUBJECTS:</strong></p>
                <ol class="result-list">${itemsHtml}</ol>
                <p><strong>TOTAL FEES:</strong> ₹${total}</p>
            </div>
        `;

        resultContainer.classList.remove('result-enter');
        // force reflow to restart animation
        void resultContainer.offsetWidth;
        resultContainer.classList.add('result-enter');
    });
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
});
