export default function Header() {
    return (
        <header className="header-block">
            <div className="header-block-left-part">
                <i className="fas fa-sim-card" style={{ fontSize: '32px' }}></i>
                <h1>Панель управления тарифами</h1>
            </div>
            <div className="header-block-right-part">
                <div className="header-block-right-part-avatar">
                    <i className="fas fa-user"></i>
                </div>
                <span className="header-block-right-part-name">
                    Оператор связи
                </span>
            </div>
        </header>
    );
}