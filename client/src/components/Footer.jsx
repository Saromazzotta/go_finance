import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div>
                        <div className="text-center">
                            <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-center">
                            <a href="/about" className="text-white mx-3">About</a>
                            <a href="/contact" className="text-white mx-3">Contact</a>
                            <a href="/privacy" className="text-white mx-3">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer