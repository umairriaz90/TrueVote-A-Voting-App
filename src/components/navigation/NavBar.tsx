interface NavbarProps {
    currentAccount: string;
    isConnected: boolean;
  }
  
  const Navbar = ({ currentAccount, isConnected }: NavbarProps) => {
    return (
      <nav className="bg-patriot-blue text-patriot-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold mr-8">TrueVote</Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-patriot-red transition-colors">Home</Link>
            <Link to="/elections" className="hover:text-patriot-red transition-colors">Elections</Link>
            <Link to="/cast-vote" className="hover:text-patriot-red transition-colors">Cast Vote</Link>
            <Link to="/results" className="hover:text-patriot-red transition-colors">Results</Link>
            <Link to="/analytics" className="hover:text-patriot-red transition-colors">Analytics</Link>
            <Link to="/education" className="hover:text-patriot-red transition-colors">Education</Link>
            <Link to="/profile" className="hover:text-patriot-red transition-colors">Profile</Link>
          </div>
  
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="bg-patriot-red px-3 py-1 rounded text-sm">
                  {currentAccount.substring(0, 6)}...{currentAccount.substring(38)}
                </span>
                <Link to="/profile" className="hover:text-patriot-red">
                  <UserCircle className="h-6 w-6" />
                </Link>
              </div>
            ) : (
              <button className="bg-patriot-red hover:bg-patriot-red-dark px-4 py-2 rounded transition-colors">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  };
  