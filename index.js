//Subscription
function handleSubscribe() {
   // console.log('Button clicked'); 
    //modal container
    const modal = document.createElement('div');
    modal.className = 'subscribe__modal';

    //console.log('modal has been created');

    //modal content
    const modalContent = `
     <div class="modal__content">
            <span class="close__btn">&times;</span>
            <h2>Subscribe to My Blog</h2>
            <p>Stay updated with our latest Blogs and stories!</p>
            <form id="subscribeForm">
                <input type="email" id="emailInput" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
                <p id="statusMessage" class="status__message"></p>
            </form>
        </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    //console.log('modal has been appended to the body');


    //Modal fade in effect
    setTimeout(() => modal.classList.add('active'), 10);

    //Handle from submission
    const form = modal.querySelector('#subscribeForm');
    const statusMessage = document.getElementById('statusMessage');

    form.onsubmit = async (e) => {
        e.preventDefault();
       // console.log('Form submitted');
        const email = document.getElementById('emailInput').value;

        try {
            //connecting to server.js
            const response = await fetch('/subscribe', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email}),
            });

            const data = await response.json();
            

            if (response.ok) {
                statusMessage.textContent = data.message;
                statusMessage.style.color = 'green';

                form.reset(); //Clearing the form

                //Close modal after submission
                setTimeout(() => {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }, 2000);
            } else {
                statusMessage.textContent = data.error || 'Subscription failed, You cant try again';
                statusMessage.className = 'status__message error';
            }
        } catch (error) {
            statusMessage.textContent = 'An occurence of an error, try again later!!';
            statusMessage.className = 'status__message error';
        }
    };
}