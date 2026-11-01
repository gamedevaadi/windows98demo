import React, { useState } from 'react';
import { WinIcon } from '../common/WinIcon';
import { SoundEngine } from '../../services/soundEngine';

interface Email {
  id: string;
  from: string;
  subject: string;
  date: string;
  content: string;
}

const EMAILS: Email[] = [
  {
    id: '1',
    from: 'msexchange@microsoft.com',
    subject: 'Welcome to Outlook Express 5.0',
    date: '15/06/1998 10:00 AM',
    content: `Welcome to Microsoft Outlook Express 5.0!

Outlook Express is the premier email and news client designed specifically for Microsoft Windows 98.

Key Features:
- Multiple POP3 and IMAP account support
- Rich HTML message formatting
- Built-in address book and contact management
- Seamless integration with Internet Explorer 5

Thank you for choosing Microsoft Windows 98 Second Edition!`
  },
  {
    id: '2',
    from: 'y2k_preparedness@defense.gov',
    subject: 'URGENT: Millennium Bug Instructions for Pentium II Users',
    date: '31/12/1999 08:30 PM',
    content: `Attention Citizen:
Please ensure your BIOS date is manually synced to 2000. Do not operate electronic toasters or elevators between 11:59 PM and 12:01 AM. Back up all crucial documents to 3.5" floppy disks immediately.`
  },
  {
    id: '3',
    from: 'napster_fan_99@geocities.com',
    subject: 'Check out the new Eminem track on Winamp!',
    date: '14/05/2002 02:15 PM',
    content: `Hey! I just spent 45 minutes downloading "Without Me" over my 56k dial-up connection. It plays great in Winamp with the equalizer turned on. Launch Winamp on your desktop to listen to the chiptune!`
  }
];

export const OutlookExpressApp: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<string>('1');
  const [isComposing, setIsComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const currentEmail = emails.find(e => e.id === selectedEmailId) || emails[0];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) return;

    const newEmail: Email = {
      id: Date.now().toString(),
      from: 'me@abandoned-pc.local',
      subject: composeSubject || '(No Subject)',
      date: 'Just now',
      content: composeBody
    };

    setEmails([newEmail, ...emails]);
    setSelectedEmailId(newEmail.id);
    setIsComposing(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    SoundEngine.playDing();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Outlook Toolbar */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-1 bg-[#c0c0c0] shrink-0">
        <button
          onClick={() => setIsComposing(true)}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px] font-bold text-[#000080]"
        >
          <span>✉</span> New Mail
        </button>
        <button
          onClick={() => SoundEngine.playDing()}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          Send/Recv
        </button>
        <button
          onClick={() => {
            if (emails.length > 1) {
              setEmails(emails.filter(e => e.id !== selectedEmailId));
              setSelectedEmailId(emails[0].id);
              SoundEngine.playTrash();
            }
          }}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          Delete
        </button>
      </div>

      {isComposing ? (
        <form onSubmit={handleSendEmail} className="flex-1 p-2 bg-[#dfdfdf] flex flex-col gap-2">
          <div className="font-bold text-[#000080] border-b border-gray-400 pb-1">
            New Message
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 text-right">To:</span>
            <input
              type="text"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              placeholder="recipient@domain.com"
              className="flex-1 win98-box-sunken px-2 py-0.5 bg-white text-[11px]"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 text-right">Subject:</span>
            <input
              type="text"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              placeholder="Subject line"
              className="flex-1 win98-box-sunken px-2 py-0.5 bg-white text-[11px]"
            />
          </div>
          <div className="flex-1 win98-box-sunken bg-white p-1">
            <textarea
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              placeholder="Write your email here..."
              className="w-full h-full p-2 outline-none border-none text-[12px] font-sans resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsComposing(false)}
              className="win98-btn px-3 py-1 text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="win98-btn px-4 py-1 text-[11px] font-bold text-[#000080]"
            >
              Send Mail
            </button>
          </div>
        </form>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Folders Pane */}
          <div className="w-36 win98-box-sunken bg-white p-1 flex flex-col gap-1 shrink-0">
            <div className="font-bold text-[10px] text-gray-500 uppercase px-1">Outlook Express</div>
            <div className="bg-[#000080] text-white px-2 py-0.5 font-bold cursor-pointer">
              📥 Inbox ({emails.length})
            </div>
            <div className="px-2 py-0.5 hover:bg-gray-100 cursor-pointer">
              📤 Outbox
            </div>
            <div className="px-2 py-0.5 hover:bg-gray-100 cursor-pointer">
              📨 Sent Items
            </div>
            <div className="px-2 py-0.5 hover:bg-gray-100 cursor-pointer">
              🗑 Deleted Items
            </div>
          </div>

          {/* Messages Split */}
          <div className="flex-1 flex flex-col min-w-0 bg-white win98-box-sunken ml-1">
            {/* Email List Table */}
            <div className="h-32 border-b-2 border-[#808080] overflow-y-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-[#c0c0c0] sticky top-0 border-b border-[#808080]">
                  <tr>
                    <th className="p-1 font-bold">From</th>
                    <th className="p-1 font-bold">Subject</th>
                    <th className="p-1 font-bold w-28">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email) => {
                    const isSelected = email.id === selectedEmailId;
                    return (
                      <tr
                        key={email.id}
                        onClick={() => setSelectedEmailId(email.id)}
                        className={`cursor-pointer ${
                          isSelected ? 'bg-[#000080] text-white' : 'hover:bg-blue-50'
                        }`}
                      >
                        <td className="p-1 truncate max-w-[120px] font-semibold">{email.from}</td>
                        <td className="p-1 truncate">{email.subject}</td>
                        <td className="p-1 truncate text-[10px] text-gray-500">{email.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Email Body Preview */}
            <div className="flex-1 p-3 overflow-y-auto bg-white flex flex-col gap-2">
              <div className="border-b border-gray-300 pb-2">
                <div className="font-bold text-sm text-[#000080]">{currentEmail.subject}</div>
                <div className="text-gray-600 text-[10px] mt-0.5">From: {currentEmail.from} · {currentEmail.date}</div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed text-[12px] text-gray-800">
                {currentEmail.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
