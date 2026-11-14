/**
 * One fun fact per ramen, shown on the detail page in place of the blurb.
 * Every fact is paraphrased from the linked source; keep claims within what the source says.
 */
export interface FunFact {
  fact: string
  source: string
  url: string
}

export const FUN_FACTS: Record<string, FunFact> = {
  'tokyo-shoyu': {
    fact: 'Japan’s first dedicated ramen shop, Rairaiken, opened in Asakusa in 1910 serving soy-based ramen. It closed in 1976 — and was brought back to life inside the Shin-Yokohama Ramen Museum.',
    source: 'Time Out Tokyo',
    url: 'https://timeout.com/tokyo/news/japans-first-ramen-restaurant-closed-in-1976-is-reopening-at-shin-yokohama-ramen-museum-081420',
  },
  'hakodate-shio': {
    fact: 'Hakodate may have the strongest claim to Japan’s first ramen: an 1884 newspaper ad for “Nankin soba” — noodles from Nanjing.',
    source: 'Japan Travel',
    url: 'https://en.japantravel.com/guide/a-guide-to-hakodate-ramen/25332',
  },
  'sapporo-miso': {
    fact: 'Miso ramen was born in 1955 at Aji no Sanpei, after a customer asked founder Morito Omiya to put noodles in his miso pork soup.',
    source: 'Cookpit',
    url: 'https://cookpit.jp/en/local-ramen/007',
  },
  'asahikawa-shoyu': {
    fact: 'Hachiya, one of Asahikawa’s founding shops (1947), is named “bee” because the ice-cream shop it grew from used honey when postwar sugar was scarce. Sniff for the burnt-lard aroma.',
    source: 'Cookpit',
    url: 'https://cookpit.jp/en/local-ramen/001',
  },
  'hakata-tonkotsu': {
    fact: 'Kaedama — ordering a second round of noodles into your leftover soup — is said to have started at stalls by Nagahama fish market, where workers had little time to eat and needed fast-cooking noodles.',
    source: 'Fukuoka Now',
    url: 'https://fukuoka-now.com/en/rwc/deep-fukuoka/tonkotsu-ramen',
  },
  kurume: {
    fact: 'Tonkotsu’s milky white soup was an accident: in 1947 the owner of the Sankyu stall left his pork-bone soup boiling while he stepped away, and came back to a cloudy broth.',
    source: 'Crossroad Fukuoka',
    url: 'https://www.crossroadfukuoka.jp/en/articles/kurume-ramen',
  },
  kumamoto: {
    fact: 'Ajisen Ramen took Kumamoto-style tonkotsu from Kumamoto all the way to China — about 590 shops there by 2011.',
    source: 'Wikipedia: Ajisen Ramen',
    url: 'https://en.wikipedia.org/wiki/Ajisen_Ramen',
  },
  kagoshima: {
    fact: 'Sit down in Kagoshima and you’re often handed tea and pickled daikon before your bowl arrives. The city’s oldest shop is said to have begun with a nurse who learned ramen from a grateful Chinese patient.',
    source: 'Food in Japan',
    url: 'https://www.foodinjapan.org/kyushu/kagoshima-ramen',
  },
  iekei: {
    fact: 'Iekei began in 1974 at Yoshimuraya near Shin-Sugita, Yokohama, opened by a former truck driver. Order it your way: noodle firmness, oil and tare strength.',
    source: 'Ramen Beast',
    url: 'https://ramenbeast.substack.com/p/the-delicious-murky-history-of-iekei',
  },
  jiro: {
    fact: 'Ramen Jiro opened in 1968. When its Mita shop had to move in 1995, Keio University students petitioned to move it onto campus — the university said no.',
    source: 'Wikipedia: Ramen Jiro',
    url: 'https://en.wikipedia.org/wiki/Ramen_Jiro',
  },
  kitakata: {
    fact: 'Kitakata has more than 100 ramen shops and a habit called asa-ra — ramen for breakfast. Visitors who came for its old kura storehouses spread the word, and 1980s TV coverage made it famous.',
    source: 'Culture Trip',
    url: 'https://theculturetrip.com/asia/japan/articles/the-story-of-kitakatas-ramen-and-where-to-eat-it-according-to-an-expert',
  },
  shirakawa: {
    fact: 'Many Shirakawa shops trace back to Tora Shokudo (1969), whose apprentices spread “Tora-kei” ramen across Japan. It closes when the day’s handmade noodles run out.',
    source: 'Cookpit',
    url: 'https://cookpit.jp/en/local-ramen/047',
  },
  sano: {
    fact: 'Sano’s noodles are made by aotake-uchi: the cook sits on a long green bamboo pole and bounces on it to press the dough, giving soft, springy noodles.',
    source: 'Shin-Yokohama Ramen Museum',
    url: 'https://raumen.co.jp/makingnoodle_en.html',
  },
  'toyama-black': {
    fact: 'Created in 1947 at Taiki for postwar laborers — the extra-salty dark soy was meant to top up the salt they lost to sweat. Locals eat it with rice.',
    source: 'Visit Toyama',
    url: 'https://visit-toyama-japan.com/en/travel-inspiration/toyama-black-ramen',
  },
  hachioji: {
    fact: 'Around 1960 the owner of Hatsufuji added chopped onion after his mother-in-law, a former geisha, told him about onion-topped ramen she’d eaten in Hokkaido.',
    source: 'Japan News via inkl',
    url: 'https://www.inkl.com/news/japan-in-focus-chopped-onions-adorn-hachioji-ramen',
  },
  takayama: {
    fact: 'Locals still call it “chuka soba”. At Masago, three generations of one family have served the same bowl for more than 70 years.',
    source: 'Taiken Japan',
    url: 'https://taiken.co/single/masago-ramen-3-generations-of-takayama-ramen/',
  },
  kyoto: {
    fact: 'Shinpuku Saikan’s founder Xu Yongbao, from Zhejiang, started with a noodle stall by Kyoto Station. Its near-black soup and heap of Kujo green onions became a Kyoto classic.',
    source: 'Food in Japan',
    url: 'https://www.foodinjapan.org/kansai/kyoto/kyoto-ramen/',
  },
  wakayama: {
    fact: 'In 1998, Ide Shoten was named Japan’s tastiest ramen on a New Year’s Day TV show — and Wakayama’s brown tonkotsu-shoyu went national.',
    source: 'Tokyo Fox',
    url: 'https://tokyofox.net/2021/12/04/dining-out-the-ramen-considered-to-be-the-best-in-japan/',
  },
  tokushima: {
    fact: 'Tokushima ramen debuted at the Shin-Yokohama Ramen Museum in 1998 as “the last new local ramen of the 20th century”. Stir in the raw egg — locals call it sukiyaki style.',
    source: 'Discover Tokushima',
    url: 'https://discovertokushima.net/en/column/tokushima-ramen/',
  },
  onomichi: {
    fact: 'Ramen reached Onomichi in 1928 with a cook from Fujian. Shukaen (1947) was opened by a former Taiwanese shipbuilding engineer; its back fat simmers in soy for about four hours.',
    source: 'Cookpit',
    url: 'https://cookpit.jp/en/local-ramen/179',
  },
  'tsubame-sanjo': {
    fact: 'This bowl was devised to fuel the busy metalworkers of Tsubame-Sanjo, a town of craftsmen — hence the filling blanket of back fat.',
    source: 'Yukiguni Japan',
    url: 'https://adventure.yukigunijapan.com/cassette/craftsmens-ramen-of-tsubame-sanjo',
  },
  'nagaoka-ginger': {
    fact: 'Ginger was first added to mask the smell of pork-bone broth — and its warming kick turned out perfect for snowy Niigata.',
    source: 'Food in Japan',
    url: 'https://www.foodinjapan.org/chubu/nagaoka-syoga-ramen',
  },
  niboshi: {
    fact: 'Also called “sardine ramen”. In Kuroishi, Aomori, Wagaya has served its light niboshi bowl from the same spot for more than 65 years.',
    source: 'Nichigo Press',
    url: 'https://nichigopress.jp/english-item/niboshi-ramen-the-ramen-from-japans-north-that-you-need-to-try-next/',
  },
  'tori-paitan': {
    fact: 'Toripaitan means “chicken white soup”. Its boom from around 2013 flipped classic ramen: lean, ultra-tender chicken chashu in a rich, thick soup.',
    source: 'Taiken Japan',
    url: 'https://taiken.co/single/the-latest-ramen-boom-toripaitan-chicken-ramen/',
  },
  tantanmen: {
    fact: '“Dandan” is the shoulder pole Sichuan street vendors carried — noodles in one basket, sauce in the other. Chef Chen Kenmin brought the dish to Japan, where the soup version took over.',
    source: 'Wikipedia: Dandan noodles',
    url: 'https://en.wikipedia.org/wiki/Dandan_noodles',
  },
  'hiroshima-shirunashi': {
    fact: 'A young style: it traces back to Kisaku, which opened in Hiroshima in 2001. House rule — stir 20 to 30 times before your first bite.',
    source: 'Table Journey',
    url: 'https://tablejourney.com/dish/shirunashi-tantanmen/',
  },
  'katsuura-tantanmen': {
    fact: 'Created in 1954 at Ezawa for fishermen and ama divers coming in cold from the sea. With no sesame paste on hand, the chef used soy broth and chili oil — and Katsuura won the 2015 B-1 Grand Prix.',
    source: 'Ramen Beast',
    url: 'https://ramenbeast.substack.com/p/katsuura-tantanmen-a-rare-spicy-species',
  },
  karamiso: {
    fact: 'Born at Ryu Shanghai in Akayu, Yamagata: a ball of chili-garlic miso sits in the middle of the bowl and slowly melts as you eat.',
    source: 'Visit Yamagata',
    url: 'https://www.visityamagata.jp/en/topics-yamagata-ramen_karamiso-en',
  },
  'taiwan-ramen': {
    fact: 'Not from Taiwan: Misen’s Taiwanese owner created it in Nagoya around 1970 as a staff meal. Order it “America” style and you get the milder version.',
    source: 'Unseen Japan',
    url: 'https://unseen-japan.com/taiwan-ramen-nagoya-origin/',
  },
  'taiwan-mazesoba': {
    fact: 'Also not Taiwanese — it’s a Nagoya dish, popularised by Menya Hanabi in 2008.',
    source: 'Wikipedia: Taiwan mazesoba',
    url: 'https://en.wikipedia.org/wiki/Taiwan_mazesoba',
  },
  'abura-soba': {
    fact: 'Two Tokyo shops near universities claim to have invented it — Sanko in Kunitachi (1952) and Chinchintei in Musashino. Cheap and filling, it’s still a student favourite.',
    source: 'Wikipedia: Aburasoba',
    url: 'https://en.wikipedia.org/wiki/Aburasoba',
  },
  tsukemen: {
    fact: 'Invented by Kazuo Yamagishi, “the God of Ramen”, who put “special morisoba” on Taishoken’s menu in 1961 — inspired by a co-worker dipping noodles into a soup bowl.',
    source: 'Wikipedia: Kazuo Yamagishi',
    url: 'https://en.wikipedia.org/wiki/Kazuo_Yamagishi',
  },
  'hiyashi-chuka': {
    fact: 'Said to have been invented in 1937 at Ryutei in Sendai, adapted from a Shanghai cold noodle dish. In Kansai it goes by reimen.',
    source: 'Wikipedia: Hiyashi chūka',
    url: 'https://en.wikipedia.org/wiki/Hiyashi_ch%C5%ABka',
  },
  champon: {
    fact: 'Created at Shikairo in Nagasaki, founded 1899, by Chen Pingshun — to give Chinese students in Japan a cheap, filling meal.',
    source: 'Wikipedia: Champon',
    url: 'https://en.wikipedia.org/wiki/Champon',
  },
  'okinawa-soba': {
    fact: 'There’s no buckwheat in it, so in the 1970s regulators said it couldn’t be called “soba”. Local noodle makers fought back and won — October 17 is now Okinawa Soba Day.',
    source: 'Stars and Stripes Okinawa',
    url: 'https://japan.stripes.com/food-drink/did-you-know-october-17-is-okinawa-soba-day.html1',
  },
  tenri: {
    fact: 'Began in 1968 as Saika Ramen’s street stall in Tenri, Nara — still famous for its mound of stir-fried cabbage.',
    source: 'Cookpit',
    url: 'https://cookpit.jp/en/local-ramen/153',
  },
  takaida: {
    fact: 'Born right after WWII as a cheap, filling meal for laborers in east Osaka. Koyoken, a street stall from 1953, is called its birthplace.',
    source: 'nippon.com',
    url: 'https://www.nippon.com/en/japan-topics/c13817/',
  },
  sanmamen: {
    fact: 'Nothing to do with saury (sanma)! The name comes from Cantonese words for fresh, crisp toppings, and it began as a staff meal for cooks in Yokohama’s Chinese kitchens.',
    source: 'Food in Japan',
    url: 'https://www.foodinjapan.org/kanto/kanagawa/sanmamen/',
  },
  karamen: {
    fact: 'Nobeoka in Miyazaki is its birthplace. The chewy buckwheat-and-wheat noodles are nicknamed “konnyaku noodles”, and heat levels run from mild to super spicy.',
    source: 'Nobeoka Tourism',
    url: 'https://en.nobekan.jp/feature/index.php?p=karamen',
  },
  'miso-butter-corn': {
    fact: 'Corn and butter are two Hokkaido specialties — and the butter helps keep the soup hot through long northern winters.',
    source: 'Sakuraco',
    url: 'https://sakura.co/blog/hokkaido-butter-ramen-history',
  },
  'tomato-ramen': {
    fact: 'Taiyo no Tomato-men opened in Kinshicho, Tokyo, in 2006. Add a little rice and cheese to the leftover soup and it becomes a mini risotto.',
    source: 'Japan Travel',
    url: 'https://en.japantravel.com/tokyo/taiyou-no-tomato-men/40319',
  },
}
