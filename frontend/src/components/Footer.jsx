export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer-block">
            <div>
                <i></i>{currentYear}.Все права защищены.
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                <i></i> Личный кабинет менеджера мобильного оператора
            </div>
        </footer>
    );
}