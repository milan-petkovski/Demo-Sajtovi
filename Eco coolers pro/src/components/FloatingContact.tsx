import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/381062447147',
      color: 'bg-[hsl(142,70%,45%)]',
    },
    {
      name: 'Viber',
      icon: Phone,
      href: 'viber://chat?number=%2B381062447147',
      color: 'bg-[hsl(270,50%,50%)]',
    },
    {
      name: 'Poziv',
      icon: Phone,
      href: 'tel:062447147',
      color: 'bg-primary',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact Options */}
      {isOpen && (
        <div className="flex flex-col gap-2 animate-slide-in-right">
          {contacts.map((contact, index) => (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-full ${contact.color} text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <contact.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{contact.name}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main Button */}
      <Button
        variant="floating"
        size="iconLg"
        onClick={() => setIsOpen(!isOpen)}
        className="animate-float"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingContact;
