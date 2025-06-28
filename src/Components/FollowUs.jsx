// File: src/components/FollowUs.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function FollowUs({ links = {} }) {
  const socials = [
    {
      name: 'Facebook',
      href: links.facebook,
      icon: <FaFacebookF className="text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      name: 'Instagram',
      href: links.instagram,
      icon: <FaInstagram className="text-pink-500" />,
      bg: 'bg-pink-50',
      border: 'border-pink-100'
    },
    {
      name: 'YouTube',
      href: links.youtube,
      icon: <FaYoutube className="text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100'
    },
    {
      name: 'LinkedIn',
      href: links.linkedin,
      icon: <FaLinkedinIn className="text-blue-400" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      name: 'X',
      href: links.x,
      icon: <FaTwitter className="text-gray-700" />,
      bg: 'bg-gray-50',
      border: 'border-gray-100'
    }
  ];

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
        <p className="text-gray-600 mb-4 text-sm">Don't miss any updates.</p>
        <div className="flex space-x-3">
          {socials.map(
            ({ name, href, icon, bg, border }) =>
              href && (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${bg} ${border} p-3 rounded-lg border hover:opacity-90`}
                >
                  {icon}
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
}
