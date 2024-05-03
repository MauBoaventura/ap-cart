import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex justify-between">
                    <li>
                        <Link className='text-white font-bold' href="/" >Home</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:text-gray-300" href="/itens">Itens</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:text-gray-300" href="/cart">Carrinho</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
