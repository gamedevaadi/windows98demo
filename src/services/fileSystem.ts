import { FileItem } from '../types/win98';

export const INITIAL_FILESYSTEM: FileItem = {
  id: 'root',
  name: 'My Computer',
  type: 'system',
  icon: 'computer',
  children: [
    {
      id: 'drive_c',
      name: 'Local Disk (C:)',
      type: 'system',
      icon: 'drive',
      children: [
        {
          id: 'my_documents',
          name: 'My Documents',
          type: 'folder',
          icon: 'my_documents',
          children: [
            {
              id: 'folder_pictures',
              name: 'My Pictures',
              type: 'folder',
              icon: 'folder',
              children: [
                {
                  id: 'doc_photo_user1',
                  name: 'portrait_punk_1998.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/assets/aistudio/Screenshot_2026-11-01_155733_aa9ad62e.png',
                  size: '482 KB',
                  date: '14/08/1998 04:15 PM'
                },
                {
                  id: 'doc_photo_user2',
                  name: 'mugshot_archive_record.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/assets/aistudio/Screenshot_2026-11-01_155851_7b8a0f3a.png',
                  size: '395 KB',
                  date: '28/09/1998 09:20 AM'
                },
                {
                  id: 'doc_world_cup_1998',
                  name: 'world_cup_1998.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/src/assets/images/world_cup_1998_1793527136275.jpg',
                  size: '412 KB',
                  date: '12/07/1998 10:42 PM'
                },
                {
                  id: 'doc_titanic_1997',
                  name: 'titanic_1997.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/src/assets/images/titanic_1997_1793527135472.jpg',
                  size: '388 KB',
                  date: '19/12/1997 08:15 PM'
                },
                {
                  id: 'doc_vacation_99',
                  name: 'family_vacation_1999.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/src/assets/images/family_vacation_1999_1793527136797.jpg',
                  size: '524 KB',
                  date: '22/07/1999 03:30 PM'
                },
                {
                  id: 'doc_cs_lan',
                  name: 'counter_strike_lan.jpg',
                  type: 'image',
                  icon: 'image',
                  imageUrl: '/src/assets/images/counter_strike_lan_1793527137609.jpg',
                  size: '610 KB',
                  date: '14/10/2000 11:59 PM'
                }
              ]
            },
            {
              id: 'folder_1998',
              name: '1998 Archives',
              type: 'folder',
              icon: 'folder',
              children: [
                {
                  id: 'doc_news_1998',
                  name: 'news_clipping_1998.txt',
                  type: 'text',
                  icon: 'text',
                  size: '3 KB',
                  date: '04/09/1998 02:11 PM',
                  content: `DAILY DISPATCH - SEPTEMBER 4, 1998
=====================================================
NEW SEARCH ENGINE 'GOOGLE' LAUNCHES FROM STANFORD DORM

Two Stanford Ph.D. students, Larry Page and Sergey Brin, have incorporated a fledgling Internet search company named 'Google' in a garage in Menlo Park. 

The search engine claims to crawl over 25 million web pages and ranks them using a mathematical algorithm called 'PageRank'. 

Critics remain skeptical whether this will challenge the dominant portal giants Yahoo!, Excite, and AltaVista.`
                },
                {
                  id: 'doc_most_wanted',
                  name: 'most_wanted_list.txt',
                  type: 'text',
                  icon: 'text',
                  size: '2 KB',
                  date: '15/11/1998 11:20 AM',
                  content: `FEDERAL ARCHIVE BULLETIN (1998)
=====================================================
GLOBAL WATCHLIST & HIGH-PROFILE SUBJECTS:

1. Osama bin Laden (Indicted in US Embassy bombings in Nairobi & Dar es Salaam)
2. The "Melissa Virus" author (Active cyber surveillance)
3. Y2K Millennium Bug "Doomsday Cult" ringleaders

CLASSIFIED ADVISORY:
Keep backups on floppy disks.`
                }
              ]
            },
            {
              id: 'doc_y2k_diary',
              name: 'diary_1999_y2k_panic.txt',
              type: 'text',
              icon: 'text',
              size: '3.1 KB',
              date: '31/12/1999 11:45 PM',
              content: `DECEMBER 31, 1999 - 11:45 PM
=====================================================
Only 15 minutes left until Year 2000. 

Dad has filled the entire bathtub with tap water. There are 45 cans of Heinz baked beans and 12 packs of candles stacked in the pantry. Uncle Dave says all banking mainframes will reset to 1900 and ATMs will start spewing cash into the streets.

I bought 5 extra floppy disks to back up my MP3s and my game save files. If society collapses tonight, at least I still have my Pentium II 350MHz.

Update 12:05 AM: The digital clock on the VCR blinked 00:00. The lights didn't turn off. Dad feels silly about the beans.`
            },
            {
              id: 'doc_911',
              name: '9-11-attack-planning.txt',
              type: 'text',
              icon: 'text',
              size: '4.2 KB',
              date: '02/08/2001 01:23 AM',
              content: `[CONFIDENTIAL RESEARCH DOSSIER - AUGUST 2001]
=====================================================
SUBJECT: ANOMALOUS AVIATION PATTERNS & THREAT SIGNALS

Source: Anonymous intelligence memo intercepted via bulletin board system (BBS).

Investigating unusual enrolments in flight simulator programs across Florida and Minnesota where students specifically declined training on landing and takeoff procedures, focusing solely on mid-air navigation and steering controls of multi-engine commercial jetliners (Boeing 767 / 757).

Targeting architectural high-visibility structures:
- World Trade Center Complex (Tower 1 & Tower 2)
- Pentagon Military Headquarters
- US Capitol Building / White House`
            },
            {
              id: 'doc_eminem_track',
              name: 'without_me_eminem.mp3',
              type: 'audio',
              icon: 'audio',
              size: '3.8 MB',
              date: '15/05/2002 04:20 PM'
            }
          ]
        },
        {
          id: 'games_folder',
          name: 'Games',
          type: 'folder',
          icon: 'folder',
          children: [
            {
              id: 'game_mario',
              name: 'Super Mario Bros.exe',
              type: 'app',
              icon: 'mario',
              appTarget: 'mario',
              size: '180 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'game_minesweeper',
              name: 'Minesweeper.exe',
              type: 'app',
              icon: 'minesweeper',
              appTarget: 'minesweeper',
              size: '42 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'game_pinball',
              name: 'Space Cadet 3D Pinball.exe',
              type: 'app',
              icon: 'pinball',
              appTarget: 'pinball',
              size: '1.2 MB',
              date: '08/04/1998 01:14 PM'
            }
          ]
        },
        {
          id: 'program_files',
          name: 'Program Files',
          type: 'folder',
          icon: 'folder',
          children: [
            {
              id: 'pf_ie',
              name: 'Internet Explorer',
              type: 'folder',
              icon: 'folder',
              children: [
                {
                  id: 'iexplore_exe',
                  name: 'iexplore.exe',
                  type: 'app',
                  icon: 'internet_explorer',
                  appTarget: 'internet_explorer',
                  size: '89 KB',
                  date: '11/05/1998 08:01 PM'
                }
              ]
            },
            {
              id: 'pf_winamp',
              name: 'Winamp',
              type: 'folder',
              icon: 'folder',
              children: [
                {
                  id: 'winamp_exe',
                  name: 'winamp.exe',
                  type: 'app',
                  icon: 'winamp',
                  appTarget: 'winamp',
                  size: '480 KB',
                  date: '20/03/1999 07:11 PM'
                }
              ]
            }
          ]
        },
        {
          id: 'windows_folder',
          name: 'WINDOWS',
          type: 'folder',
          icon: 'folder',
          children: [
            {
              id: 'win_notepad',
              name: 'notepad.exe',
              type: 'app',
              icon: 'notepad',
              appTarget: 'notepad',
              size: '34 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'win_paint',
              name: 'mspaint.exe',
              type: 'app',
              icon: 'paint',
              appTarget: 'paint',
              size: '220 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'win_calc',
              name: 'calc.exe',
              type: 'app',
              icon: 'calculator',
              appTarget: 'calculator',
              size: '64 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'win_cmd',
              name: 'command.com',
              type: 'app',
              icon: 'cmd',
              appTarget: 'cmd',
              size: '92 KB',
              date: '11/05/1998 08:01 PM'
            },
            {
              id: 'win_wordpad',
              name: 'wordpad.exe',
              type: 'app',
              icon: 'wordpad',
              appTarget: 'wordpad',
              size: '140 KB',
              date: '11/05/1998 08:01 PM'
            }
          ]
        }
      ]
    },
    {
      id: 'drive_a',
      name: '3½ Floppy (A:)',
      type: 'system',
      icon: 'floppy',
      children: []
    },
    {
      id: 'drive_d',
      name: 'Audio CD (D:)',
      type: 'system',
      icon: 'cd',
      children: [
        {
          id: 'cd_track1',
          name: 'Track01 - Without Me.cda',
          type: 'audio',
          icon: 'audio',
          size: '44 KB',
          date: '01/01/1998 00:00 AM'
        },
        {
          id: 'cd_track2',
          name: 'Track02 - Sandstorm.cda',
          type: 'audio',
          icon: 'audio',
          size: '44 KB',
          date: '01/01/1998 00:00 AM'
        }
      ]
    }
  ]
};

export const RECYCLE_BIN_ITEMS: FileItem[] = [
  {
    id: 'trash_bonzi',
    name: 'bonzibuddy_installer.exe',
    type: 'text',
    icon: 'app',
    size: '1.2 MB',
    date: '18/06/2000 04:12 PM',
    content: `Purged setup file for desktop assistant.`
  },
  {
    id: 'trash_math_homework',
    name: 'calculus_homework_final.doc',
    type: 'text',
    icon: 'text',
    size: '45 KB',
    date: '12/10/1999 11:58 PM',
    content: `Question 1: Find the integral of e^(2x) dx
Answer: (1/2) * e^(2x) + C`
  },
  {
    id: 'trash_dialup',
    name: 'dialup_notes.txt',
    type: 'text',
    icon: 'text',
    size: '2 KB',
    date: '28/02/2000 03:00 AM',
    content: `ISP Phone number: 555-0199
Username: user@msn.com
Baud rate: 56,600 bps V.90`
  }
];
