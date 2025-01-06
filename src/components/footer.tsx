import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              Contact Information
            </h3>
            <address className="text-sm not-italic text-gray-400">
              123 Medical Plaza, Suite 100
              <br />
              Cityville, State 12345
              <br />
              Phone: (+90) 224 453 31 53
              <br />
              Email: info@drname.com
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              Office Hours
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="transition-colors hover:text-[#47afe2]">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#47afe2]">
                  Patient Resources
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#47afe2]">
                  Emergency Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Dr. Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
