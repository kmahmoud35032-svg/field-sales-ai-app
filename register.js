async function register() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'user@example.com',
                password: 'password123',
                name: 'Test User',
                role: 'ADMIN'
            })
        });

        if (response.ok) {
            console.log('User registered successfully');
        } else if (response.status === 409) {
            console.log('User already exists');
        } else {
            const text = await response.text();
            console.error('Registration failed:', response.status, text);
            process.exit(1);
        }
    } catch (error) {
        console.error('Network error:', error.message);
        process.exit(1);
    }
}

register();
