import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-16 bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="grid gap-8 md:grid-cols-3 text-center max-w-4xl">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              {t("about.title")}
            </h3>
            <p className="text-sm text-gray-400">
              {t("about.description")}
            </p>
          </div>

          {/* Corporate Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              {t("corporate.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/about" className="transition-colors hover:text-[#47afe2]">
                  {t("corporate.about")}
                </a>
              </li>
              <li>
                <a href="/blog" className="transition-colors hover:text-[#47afe2]">
                  {t("corporate.blog")}
                </a>
              </li>
              <li>
                <a href="/contact" className="transition-colors hover:text-[#47afe2]">
                  {t("corporate.contact")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="transition-colors hover:text-[#47afe2]">
                  {t("corporate.privacy")}
                </a>
              </li>
            </ul>
          </div>


          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#47afe2]">
              {t("contact.title")}
            </h3>
            <address className="text-sm not-italic text-gray-400">
              {t("contact.address")}
              <br />
              {t("contact.phone")}
              <br />
              {t("contact.email")}
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400 w-full max-w-4xl">
          © {new Date().getFullYear()} Dr. Cüneyt Tamam. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
