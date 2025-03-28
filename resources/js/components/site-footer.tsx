export default function SiteFooter() {
    return (
      <footer className="w-full bg-[#1e2633] text-gray-300 px-6 py-10 mt-12">
        <div className="mx-auto">
          {/* Top Section */}
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white font-bold mb-2">DevSearch</h4>
              <p className="text-sm">Find and compare software components easily</p>
            </div>
  
            <div className="flex-1 min-w-[150px]">
              <h4 className="text-white font-bold mb-2">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">API</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
              </ul>
            </div>
  
            <div className="flex-1 min-w-[150px]">
              <h4 className="text-white font-bold mb-2">Company</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
  
            <div className="flex-1 min-w-[150px]">
              <h4 className="text-white font-bold mb-2">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
  
          {/* Divider */}
          <hr className="my-8 border-gray-600" />
  
          {/* Bottom Section */}
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} DevSearch. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  