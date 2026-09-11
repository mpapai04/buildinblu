import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const COLORS = {
  blue: '#1D56F3',
  blueDark: '#1042D0',
  ink: '#101114',
  muted: '#686D78',
  line: '#DFE2E9',
  paper: '#F7F8FA',
  white: '#FFFFFF',
  green: '#22C77A',
};

const headingFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif',
  web: 'Arial, sans-serif',
});

const bodyFont = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif',
  web: 'Arial, sans-serif',
});

const TRANSLATIONS = {
  el: {
    nav: [['Υπηρεσίες', 'services'], ['Η δουλειά μας', 'work'], ['Διαδικασία', 'process']],
    talk: 'Ας μιλήσουμε',
    contactNav: 'Επικοινωνία',
    openMenu: 'Άνοιγμα μενού',
    closeMenu: 'Κλείσιμο μενού',
    switchTo: 'Αλλαγή στα Αγγλικά',
    hero: {
      eyebrow: 'SOFTWARE COMPANY · CYPRUS',
      titleTop: 'Χτίζουμε το',
      titleAccent: 'digital',
      titleEnd: ' αύριο σου.',
      body: 'Websites, custom software και cloud συστήματα σχεδιασμένα για να δουλεύουν ',
      bodyStrong: 'γρήγορα, έξυπνα και απλά.',
      start: 'Ξεκίνα ένα project',
      explore: 'Δες τι κάνουμε',
      stats: [['04', 'ΒΑΣΙΚΕΣ\nΥΠΗΡΕΣΙΕΣ'], ['100%', 'CUSTOM\nΛΥΣΕΙΣ'], ['01', 'ΣΤΟΧΟΣ: Η\nΑΝΑΠΤΥΞΗ ΣΟΥ']],
    },
    orb: { label: 'Εικονογράφηση cloud software', code: 'καθαρός κώδικας', caption: 'ΧΤΙΣΜΕΝΟ ΣΤΟ CLOUD\nΜΕ ΦΡΟΝΤΙΔΑ' },
    servicesEyebrow: 'ΤΙ ΚΑΝΟΥΜΕ',
    servicesTitle: 'Από την ιδέα,',
    servicesTitleSecond: 'στο ',
    servicesIntro: 'Δίνουμε μορφή στις ιδέες με τεχνολογία που είναι όμορφη απ’ έξω και δυνατή από μέσα.',
    services: [
      { number: '01', icon: '▣', title: 'Websites\nπου ξεχωρίζουν.', body: 'Responsive, γρήγορα και σχεδιασμένα γύρω από το brand και τους στόχους σου.', featured: true },
      { number: '02', icon: '</>', title: 'Custom\nsoftware.', body: 'Εργαλεία και εφαρμογές κομμένα και ραμμένα στις πραγματικές ανάγκες της ομάδας σου.' },
      { number: '03', icon: '☁', title: 'Cloud\nsystems.', body: 'Ασφαλείς και scalable υποδομές που μεγαλώνουν μαζί με την επιχείρησή σου.' },
      { number: '04', icon: '✦', title: 'Smart\nautomations.', body: 'Λιγότερες επαναλήψεις, περισσότερος χρόνος. Συνδέουμε τα εργαλεία που ήδη χρησιμοποιείς.' },
    ],
    work: {
      eyebrow: 'Ο ΤΡΟΠΟΣ ΜΑΣ',
      title: 'Λιγότερο μπλα μπλα.',
      titleAccent: 'Περισσότερο build.',
      body: 'Δεν πουλάμε έτοιμα templates. Καταλαβαίνουμε πρώτα το πρόβλημα, σχεδιάζουμε τη σωστή λύση και χτίζουμε κάτι που αντέχει.',
      action: 'Πες μας την ιδέα σου',
    },
    dashboard: { overview: 'Επισκόπηση', projects: 'PROJECTS', uptime: 'UPTIME', response: 'ΑΠΟΚΡΙΣΗ', online: 'online', performance: 'Απόδοση', range: 'Τελευταίες 30 ημέρες' },
    processEyebrow: 'ΠΩΣ ΔΟΥΛΕΥΟΥΜΕ',
    processTitle: 'Απλά. Καθαρά.',
    processAccent: 'Μαζί.',
    process: [
      ['01', 'Ανακάλυψη', 'Ακούμε, ρωτάμε και ξεκαθαρίζουμε τι πραγματικά χρειάζεσαι.'],
      ['02', 'Σχεδιασμός', 'Μετατρέπουμε το πλάνο σε μια εμπειρία απλή, ξεκάθαρη και όμορφη.'],
      ['03', 'Υλοποίηση', 'Γράφουμε καθαρό κώδικα, δοκιμάζουμε και βελτιώνουμε κάθε λεπτομέρεια.'],
      ['04', 'Launch', 'Βγαίνουμε live και μένουμε δίπλα σου για ό,τι έρχεται μετά.'],
    ],
    contact: {
      eyebrow: 'ΕΧΕΙΣ ΚΑΤΙ ΣΤΟ ΜΥΑΛΟ ΣΟΥ;',
      title: 'Ας χτίσουμε',
      titleSecond: 'κάτι ',
      body: 'Πες μας δυο λόγια για το project σου και θα επιστρέψουμε με ιδέες, όχι με sales pitch.',
      action: 'Στείλε μας\nμήνυμα',
    },
    footer: 'Software & Cloud',
    rights: 'Με επιφύλαξη παντός δικαιώματος.',
  },
  en: {
    nav: [['Services', 'services'], ['Our work', 'work'], ['Process', 'process']],
    talk: 'Let’s talk',
    contactNav: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchTo: 'Switch to Greek',
    hero: {
      eyebrow: 'SOFTWARE COMPANY · CYPRUS',
      titleTop: 'We build your',
      titleAccent: 'digital',
      titleEnd: ' tomorrow.',
      body: 'Websites, custom software, and cloud systems designed to work ',
      bodyStrong: 'fast, smart, and simply.',
      start: 'Start a project',
      explore: 'See what we do',
      stats: [['04', 'CORE\nSERVICES'], ['100%', 'CUSTOM\nSOLUTIONS'], ['01', 'GOAL: YOUR\nGROWTH']],
    },
    orb: { label: 'Cloud software illustration', code: 'clean code', caption: 'BUILT IN THE CLOUD\nCRAFTED WITH CARE' },
    servicesEyebrow: 'WHAT WE DO',
    servicesTitle: 'From the idea,',
    servicesTitleSecond: 'to ',
    servicesIntro: 'We shape ideas with technology that looks beautiful on the outside and works powerfully underneath.',
    services: [
      { number: '01', icon: '▣', title: 'Websites\nthat stand out.', body: 'Responsive, fast, and designed around your brand and business goals.', featured: true },
      { number: '02', icon: '</>', title: 'Custom\nsoftware.', body: 'Tools and applications tailored to the real needs of your team.' },
      { number: '03', icon: '☁', title: 'Cloud\nsystems.', body: 'Secure, scalable infrastructure that grows together with your business.' },
      { number: '04', icon: '✦', title: 'Smart\nautomations.', body: 'Less repetition, more time. We connect the tools you already use.' },
    ],
    work: {
      eyebrow: 'HOW WE THINK',
      title: 'Less talk.',
      titleAccent: 'More building.',
      body: 'We don’t sell ready-made templates. We understand the problem first, design the right solution, and build something that lasts.',
      action: 'Tell us your idea',
    },
    dashboard: { overview: 'Overview', projects: 'PROJECTS', uptime: 'UPTIME', response: 'RESPONSE', online: 'online', performance: 'Performance', range: 'Last 30 days' },
    processEyebrow: 'HOW WE WORK',
    processTitle: 'Simple. Clear.',
    processAccent: 'Together.',
    process: [
      ['01', 'Discover', 'We listen, ask questions, and clarify what you truly need.'],
      ['02', 'Design', 'We turn the plan into an experience that is simple, clear, and beautiful.'],
      ['03', 'Build', 'We write clean code, test, and refine every detail.'],
      ['04', 'Launch', 'We go live and stay by your side for everything that comes next.'],
    ],
    contact: {
      eyebrow: 'HAVE SOMETHING IN MIND?',
      title: 'Let’s build',
      titleSecond: 'something ',
      body: 'Tell us a little about your project and we’ll come back with ideas, not a sales pitch.',
      action: 'Send us a\nmessage',
    },
    footer: 'Software & Cloud',
    rights: 'All rights reserved.',
  },
};

function Brand({ light = false }) {
  return (
    <View style={styles.brand} accessibilityLabel="BuildInBlu">
      <View style={[styles.logoCircle, light && styles.logoCircleLight]}>
        <Text style={[styles.logoCloud, light && { color: COLORS.blue }]}>☁</Text>
        <Text style={[styles.logoCode, light && { color: COLORS.white }]}>{'<>'}</Text>
      </View>
      <Text style={[styles.brandText, light && { color: COLORS.white }]}>buildin<Text style={styles.blueText}>blu</Text></Text>
    </View>
  );
}

function Arrow({ color = COLORS.white, direction = '↗' }) {
  return <Text style={[styles.arrowText, { color }]}>{direction}</Text>;
}

function Eyebrow({ children, light = false }) {
  return (
    <View style={styles.eyebrowRow}>
      <View style={[styles.eyebrowLine, light && { backgroundColor: '#85A6FF' }]} />
      <Text style={[styles.eyebrowText, light && { color: '#85A6FF' }]}>{children}</Text>
    </View>
  );
}

function ActionButton({ children, onPress, light = false, compact = false, accessibilityLabel }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || children}
      onPress={onPress}
      style={({ pressed, hovered }) => [
        styles.actionButton,
        compact && styles.actionButtonCompact,
        light && styles.actionButtonLight,
        (pressed || hovered) && styles.actionButtonPressed,
      ]}
    >
      <Text style={[styles.actionButtonText, light && { color: COLORS.ink }]}>{children}</Text>
      <Arrow color={light ? COLORS.ink : COLORS.white} />
    </Pressable>
  );
}

function HeroOrb({ compact, copy }) {
  const floatValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue, { toValue: -12, duration: 1900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(floatValue, { toValue: 0, duration: 1900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [floatValue]);

  const size = compact ? 314 : 396;

  return (
    <View style={[styles.orbArea, compact && styles.orbAreaCompact]} accessibilityLabel={copy.label}>
      <View style={[styles.orbit, { width: size + 42, height: size + 42, borderRadius: size }]} />
      <View style={[styles.orbit, styles.orbitOuter, { width: size + 94, height: size + 94, borderRadius: size }]} />
      <View style={[styles.orb, { width: size, height: size, borderRadius: size / 2 }]} />

      <Animated.View style={[styles.cloudMark, { transform: [{ translateY: floatValue }] }]}>
        <Text style={[styles.heroCloud, compact && { fontSize: 126 }]}>☁</Text>
        <Text style={[styles.heroCode, compact && { fontSize: 35 }]}>{'<  >'}</Text>
      </Animated.View>

      <View style={[styles.floatingBadge, styles.uptimeBadge, compact && { left: 0, top: 55 }]}>
        <View style={styles.statusDot} />
        <Text style={styles.badgeText}><Text style={styles.badgeStrong}>99.9%</Text> uptime</Text>
      </View>
      <View style={[styles.floatingBadge, styles.codeBadge, compact && { right: -4, bottom: 48 }]}>
        <Text style={styles.badgeCode}>{'</>'}</Text>
        <Text style={styles.badgeText}>{copy.code}</Text>
      </View>
      <Text style={[styles.orbCaption, compact && { bottom: 26 }]}>{copy.caption}</Text>
    </View>
  );
}

function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ServiceCard({ service, width }) {
  const [pressed, setPressed] = useState(false);
  const fg = service.featured ? COLORS.white : COLORS.ink;
  const secondary = service.featured ? 'rgba(255,255,255,.72)' : COLORS.muted;

  return (
    <Pressable
      accessibilityRole="summary"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.serviceCard,
        { width, backgroundColor: service.featured ? COLORS.blue : COLORS.white },
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={[styles.serviceNumber, { color: secondary }]}>{service.number}</Text>
      <View style={[styles.serviceIconWrap, { borderColor: service.featured ? 'rgba(255,255,255,.35)' : '#CBD6FF' }]}>
        <Text style={[styles.serviceIcon, { color: service.featured ? COLORS.white : COLORS.blue }, service.icon === '</>' && { fontSize: 22 }]}>{service.icon}</Text>
      </View>
      <View style={styles.serviceCopy}>
        <Text style={[styles.serviceTitle, { color: fg }]}>{service.title}</Text>
        <Text style={[styles.serviceBody, { color: secondary }]}>{service.body}</Text>
      </View>
      <Arrow color={fg} />
    </Pressable>
  );
}

function Metric({ label, value, change }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricChange}>{change}</Text>
    </View>
  );
}

function Dashboard({ compact, copy }) {
  const bars = [34, 48, 42, 68, 59, 82, 73, 96, 89, 112, 104, 132];
  return (
    <View style={[styles.dashboardShell, compact && styles.dashboardShellCompact]}>
      <View style={styles.dashboardTopbar}>
        <View style={styles.windowDots}><View style={styles.windowDot} /><View style={styles.windowDot} /><View style={styles.windowDot} /></View>
        <View style={styles.urlBar}><Text style={styles.urlText}>buildinblu.app/dashboard</Text></View>
      </View>
      <View style={styles.dashboardBody}>
        <View style={styles.dashboardRail}>
          <Text style={styles.miniBrand}>b<Text style={styles.blueText}>b</Text></Text>
          {[0, 1, 2, 3].map((item) => <View key={item} style={[styles.railItem, item === 0 && styles.railItemActive]} />)}
        </View>
        <View style={styles.dashboardContent}>
          <View style={styles.dashboardHeading}><Text style={styles.dashboardHeadingText}>{copy.overview}</Text><View style={styles.dashboardAvatar} /></View>
          <View style={styles.metricsRow}>
            <Metric label={copy.projects} value="24" change="+8.4%" />
            <Metric label={copy.uptime} value="99.9%" change={copy.online} />
            <Metric label={copy.response} value="0.8s" change="-12%" />
          </View>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}><Text style={styles.chartTitle}>{copy.performance}</Text><Text style={styles.chartRange}>{copy.range}</Text></View>
            <View style={styles.chart}>
              {bars.map((height, index) => (
                <View key={index} style={[styles.chartBar, { height, opacity: 0.32 + index * 0.05 }]} />
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.liveLabel}><Text style={styles.liveText}>LIVE </Text><View style={styles.liveDot} /></View>
    </View>
  );
}

function ProcessRow({ step, compact, last }) {
  return (
    <View style={[styles.processRow, compact && styles.processRowCompact]}>
      <Text style={styles.processNumber}>{step[0]}</Text>
      <View style={compact && { flex: 1 }}>
        <Text style={styles.processTitle}>{step[1]}</Text>
        {compact && <Text style={styles.processBody}>{step[2]}</Text>}
      </View>
      {!compact && <Text style={styles.processBody}>{step[2]}</Text>}
      <Text style={styles.processArrow}>{last ? '✓' : '→'}</Text>
    </View>
  );
}

function LanguageToggle({ language, onChange, compact }) {
  return (
    <View style={[styles.languageToggle, compact && styles.languageToggleCompact]} accessibilityRole="radiogroup">
      {['el', 'en'].map((code) => {
        const active = language === code;
        return (
          <Pressable
            key={code}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={code === 'el' ? 'Ελληνικά' : 'English'}
            onPress={() => onChange(code)}
            style={[styles.languageOption, active && styles.languageOptionActive]}
          >
            <Text style={[styles.languageOptionText, active && styles.languageOptionTextActive]}>{code.toUpperCase()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introY = useRef(new Animated.Value(22)).current;
  const tickerX = useRef(new Animated.Value(0)).current;
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('el');
  const sectionPositions = useRef({});
  const t = TRANSLATIONS[language];

  const compact = width < 720;
  const compactHeader = width < 900;
  const tablet = width >= 720 && width < 1040;
  const shellWidth = Math.min(width - (compact ? 32 : 56), 1180);
  const columns = compact ? 1 : tablet ? 2 : 4;
  const gap = 14;
  const cardWidth = (shellWidth - gap * (columns - 1)) / columns;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(introOpacity, { toValue: 1, duration: 650, useNativeDriver: true }),
      Animated.timing(introY, { toValue: 0, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    const ticker = Animated.loop(
      Animated.timing(tickerX, { toValue: -460, duration: 12500, easing: Easing.linear, useNativeDriver: true })
    );
    ticker.start();
    return () => ticker.stop();
  }, [introOpacity, introY, tickerX]);

  const navItems = useMemo(() => t.nav, [t]);

  const jumpTo = (section) => {
    setMenuOpen(false);
    const y = sectionPositions.current[section];
    if (typeof y === 'number') scrollRef.current?.scrollTo({ y: Math.max(0, y - 76), animated: true });
  };

  const capturePosition = (name) => (event) => {
    sectionPositions.current[name] = event.nativeEvent.layout.y;
  };

  const openInstagram = () => Linking.openURL('https://www.instagram.com/buildinblu/');

  return (
    <SafeAreaView style={styles.safeArea} accessibilityLanguage={language === 'el' ? 'el-GR' : 'en-US'}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.paper} />
      <View style={[styles.header, { paddingHorizontal: Math.max(16, (width - 1180) / 2) }]}>
        <Pressable onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} accessibilityRole="button">
          <Brand />
        </Pressable>

        {!compactHeader && (
          <View style={styles.desktopNav}>
            {navItems.map(([label, target]) => (
              <Pressable key={target} onPress={() => jumpTo(target)} style={styles.navItem}>
                <Text style={styles.navText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.headerControls}>
          <LanguageToggle language={language} onChange={setLanguage} compact={compactHeader} />
          {compactHeader ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={menuOpen ? t.closeMenu : t.openMenu}
              onPress={() => setMenuOpen((value) => !value)}
              style={styles.menuButton}
            >
              <View style={[styles.menuLine, menuOpen && styles.menuLineTop]} />
              <View style={[styles.menuLine, menuOpen && styles.menuLineBottom]} />
            </Pressable>
          ) : (
            <ActionButton compact onPress={openInstagram} accessibilityLabel={`${t.talk}: Instagram`}>{t.talk}</ActionButton>
          )}
        </View>
      </View>

      {compactHeader && menuOpen && (
        <View style={styles.mobileMenu}>
          {navItems.map(([label, target]) => (
            <Pressable key={target} onPress={() => jumpTo(target)}><Text style={styles.mobileMenuText}>{label}</Text></Pressable>
          ))}
          <Pressable accessibilityRole="link" onPress={openInstagram}><Text style={styles.mobileMenuText}>{t.contactNav} ↗</Text></Pressable>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!menuOpen}
      >
        <Animated.View style={{ opacity: introOpacity, transform: [{ translateY: introY }] }}>
          <View style={[styles.hero, { width: shellWidth }, compact && styles.heroCompact]}>
            <View style={[styles.heroCopy, !compact && { width: '53%' }]}>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <Text style={[styles.heroTitle, compact && styles.heroTitleCompact]}>
                {t.hero.titleTop}{`\n`}<Text style={styles.blueText}>{t.hero.titleAccent}</Text>{t.hero.titleEnd}
              </Text>
              <Text style={[styles.heroBody, compact && styles.heroBodyCompact]}>
                {t.hero.body}<Text style={styles.bodyStrong}>{t.hero.bodyStrong}</Text>
              </Text>
              <View style={styles.heroActions}>
                <ActionButton onPress={() => jumpTo('contact')}>{t.hero.start}</ActionButton>
                <Pressable onPress={() => jumpTo('services')} style={styles.textLink}>
                  <Text style={styles.textLinkText}>{t.hero.explore} ↓</Text>
                </Pressable>
              </View>
            </View>
            <HeroOrb compact={compact} copy={t.orb} />
            <View style={[styles.statsRow, compact && styles.statsRowCompact]}>
              {t.hero.stats.map(([value, label]) => <Stat key={value} value={value} label={label} />)}
            </View>
          </View>
        </Animated.View>

        <View style={styles.ticker}>
          <Animated.View style={[styles.tickerTrack, { transform: [{ translateX: tickerX }] }]}>
            {[0, 1, 2].map((set) => (
              <View key={set} style={styles.tickerSet}>
                <Text style={styles.tickerText}>WEB DESIGN</Text><Text style={styles.tickerStar}>✦</Text>
                <Text style={styles.tickerText}>CUSTOM SOFTWARE</Text><Text style={styles.tickerStar}>✦</Text>
                <Text style={styles.tickerText}>CLOUD SYSTEMS</Text><Text style={styles.tickerStar}>✦</Text>
                <Text style={styles.tickerText}>AUTOMATIONS</Text><Text style={styles.tickerStar}>✦</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        <View onLayout={capturePosition('services')} style={[styles.section, { width: shellWidth }]}>
          <Eyebrow>{t.servicesEyebrow}</Eyebrow>
          <View style={[styles.sectionHeadingRow, compact && styles.sectionHeadingStack]}>
            <Text style={[styles.sectionTitle, compact && styles.sectionTitleCompact]}>{t.servicesTitle}{`\n`}{t.servicesTitleSecond}<Text style={styles.blueText}>launch.</Text></Text>
            <Text style={styles.sectionIntro}>{t.servicesIntro}</Text>
          </View>
          <View style={styles.servicesGrid}>
            {t.services.map((service) => <ServiceCard key={service.number} service={service} width={cardWidth} />)}
          </View>
        </View>

        <View onLayout={capturePosition('work')} style={styles.workSection}>
          <View style={[styles.workInner, { width: shellWidth }, (compact || tablet) && styles.workInnerStack]}>
            <View style={[styles.workCopy, !(compact || tablet) && { width: '39%' }]}>
              <Eyebrow light>{t.work.eyebrow}</Eyebrow>
              <Text style={[styles.workTitle, compact && styles.workTitleCompact]}>{t.work.title}{`\n`}<Text style={{ color: '#7EA1FF' }}>{t.work.titleAccent}</Text></Text>
              <Text style={styles.workBody}>{t.work.body}</Text>
              <ActionButton light onPress={() => jumpTo('contact')}>{t.work.action}</ActionButton>
            </View>
            <View style={[styles.dashboardWrap, !(compact || tablet) && { width: '55%' }]}>
              <Dashboard compact={compact} copy={t.dashboard} />
            </View>
          </View>
        </View>

        <View onLayout={capturePosition('process')} style={[styles.section, { width: shellWidth }]}>
          <Eyebrow>{t.processEyebrow}</Eyebrow>
          <Text style={[styles.sectionTitle, compact && styles.sectionTitleCompact]}>{t.processTitle}{`\n`}<Text style={styles.blueText}>{t.processAccent}</Text></Text>
          <View style={styles.processList}>
            {t.process.map((step, index) => <ProcessRow key={step[0]} step={step} compact={compact} last={index === t.process.length - 1} />)}
          </View>
        </View>

        <View onLayout={capturePosition('contact')} style={[styles.contactOuter, { width: compact ? width : shellWidth }]}>
          <View style={[styles.contactCard, compact && styles.contactCardCompact]}>
            <View style={styles.contactRingOuter} /><View style={styles.contactRingInner} />
            <View style={styles.contactCopy}>
              <Eyebrow light>{t.contact.eyebrow}</Eyebrow>
              <Text style={[styles.contactTitle, compact && styles.contactTitleCompact]}>{t.contact.title}{`\n`}{t.contact.titleSecond}<Text style={{ color: '#ADC3FF' }}>blu.</Text></Text>
            </View>
            <View style={[styles.contactAction, compact && styles.contactActionCompact]}>
              <Text style={styles.contactBody}>{t.contact.body}</Text>
              <Pressable
                accessibilityRole="link"
                accessibilityLabel="BuildInBlu Instagram"
                onPress={openInstagram}
                style={({ pressed }) => [styles.roundButton, pressed && styles.roundButtonPressed]}
              >
                <Text style={styles.roundButtonText}>{t.contact.action}</Text>
                <Arrow color={COLORS.ink} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.footer, { width: shellWidth }, compact && styles.footerCompact]}>
          <Brand />
          <Text style={styles.footerText}>{t.footer}</Text>
          <View style={styles.footerLinks}>
            <Pressable onPress={openInstagram}><Text style={styles.footerLink}>Instagram</Text></Pressable>
          </View>
          <Text style={styles.copyright}>© {new Date().getFullYear()} BuildInBlu. {t.rights}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.paper },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 0 },
  header: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    backgroundColor: 'rgba(247,248,250,.97)',
    zIndex: 30,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logoCircle: { width: 37, height: 37, borderRadius: 19, backgroundColor: COLORS.blue, alignItems: 'center', justifyContent: 'center' },
  logoCircleLight: { backgroundColor: COLORS.white },
  logoCloud: { color: COLORS.white, fontSize: 25, lineHeight: 29, transform: [{ translateY: -1 }] },
  logoCode: { position: 'absolute', color: COLORS.blue, fontFamily: 'monospace', fontSize: 9, fontWeight: '900', top: 15 },
  brandText: { color: COLORS.ink, fontFamily: headingFont, fontSize: 23, fontWeight: '800', letterSpacing: -1 },
  blueText: { color: COLORS.blue },
  desktopNav: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 12 },
  navItem: { paddingHorizontal: 10, paddingVertical: 12 },
  navText: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 14, fontWeight: '600' },
  headerControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  languageToggle: { flexDirection: 'row', padding: 3, borderWidth: 1, borderColor: '#D8DCE5', borderRadius: 20, backgroundColor: COLORS.white },
  languageToggleCompact: { padding: 2 },
  languageOption: { minWidth: 34, height: 30, paddingHorizontal: 7, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  languageOptionActive: { backgroundColor: COLORS.blue },
  languageOptionText: { color: COLORS.muted, fontFamily: bodyFont, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  languageOptionTextActive: { color: COLORS.white },
  actionButton: { minHeight: 56, paddingHorizontal: 23, borderRadius: 28, backgroundColor: COLORS.blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 13, alignSelf: 'flex-start', ...Platform.select({ web: { cursor: 'pointer' } }) },
  actionButtonCompact: { minHeight: 44, paddingHorizontal: 18, backgroundColor: COLORS.ink, top: 7 },
  actionButtonLight: { backgroundColor: COLORS.white },
  actionButtonPressed: { opacity: 0.86, transform: [{ translateY: 2 }] },
  actionButtonText: { color: COLORS.white, fontFamily: bodyFont, fontSize: 14, fontWeight: '700' },
  arrowText: { fontFamily: bodyFont, fontSize: 20, fontWeight: '700' },
  menuButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.ink, alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 50 },
  menuLine: { width: 18, height: 2, borderRadius: 2, backgroundColor: COLORS.white },
  menuLineTop: { transform: [{ translateY: 4 }, { rotate: '45deg' }] },
  menuLineBottom: { transform: [{ translateY: -4 }, { rotate: '-45deg' }] },
  mobileMenu: { position: 'absolute', zIndex: 20, top: 74, left: 0, right: 0, bottom: 0, paddingHorizontal: 28, paddingTop: 52, gap: 24, backgroundColor: COLORS.blue },
  mobileMenuText: { color: COLORS.white, fontFamily: headingFont, fontSize: 36, fontWeight: '800', letterSpacing: -1.5 },
  hero: { minHeight: 710, alignSelf: 'center', paddingVertical: 76, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' },
  heroCompact: { minHeight: 980, paddingTop: 64, paddingBottom: 58, flexDirection: 'column', flexWrap: 'nowrap' },
  heroCopy: { zIndex: 2 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 22 },
  eyebrowLine: { width: 22, height: 2, backgroundColor: COLORS.blue },
  eyebrowText: { color: COLORS.blue, fontFamily: bodyFont, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  heroTitle: { color: COLORS.ink, fontFamily: headingFont, fontSize: 80, lineHeight: 76, fontWeight: '900', letterSpacing: -4.8 },
  heroTitleCompact: { fontSize: 57, lineHeight: 54, letterSpacing: -3.3 },
  heroBody: { maxWidth: 550, marginTop: 36, marginBottom: 30, color: COLORS.muted, fontFamily: bodyFont, fontSize: 18, lineHeight: 28 },
  heroBodyCompact: { fontSize: 16, lineHeight: 25, marginTop: 30, marginBottom: 26 },
  bodyStrong: { color: COLORS.ink, fontWeight: '700' },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 22 },
  textLink: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.ink },
  textLinkText: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 13, fontWeight: '700' },
  orbArea: { width: '43%', height: 460, alignItems: 'center', justifyContent: 'center' },
  orbAreaCompact: { width: '100%', height: 390, marginTop: 42 },
  orb: { position: 'absolute', backgroundColor: COLORS.blue, ...Platform.select({ web: { boxShadow: '0 32px 72px rgba(29,86,243,.22)' }, default: { elevation: 9 } }) },
  orbit: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(29,86,243,.2)' },
  orbitOuter: { borderStyle: 'dashed', borderColor: 'rgba(29,86,243,.16)' },
  cloudMark: { zIndex: 2, alignItems: 'center', justifyContent: 'center' },
  heroCloud: { color: COLORS.white, fontSize: 153, lineHeight: 175, ...Platform.select({ web: { textShadow: '0 18px 18px rgba(0,0,0,.16)' } }) },
  heroCode: { position: 'absolute', color: COLORS.blue, fontFamily: 'monospace', fontSize: 43, fontWeight: '900', top: '39%' },
  floatingBadge: { position: 'absolute', zIndex: 5, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 13, backgroundColor: 'rgba(255,255,255,.94)', flexDirection: 'row', alignItems: 'center', gap: 9, ...Platform.select({ web: { boxShadow: '0 15px 30px rgba(24,35,64,.13)' }, default: { elevation: 7 } }) },
  uptimeBadge: { left: -10, top: 74, transform: [{ rotate: '-4deg' }] },
  codeBadge: { right: -10, bottom: 68, transform: [{ rotate: '5deg' }] },
  statusDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.green },
  badgeText: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 11 },
  badgeStrong: { fontWeight: '800' },
  badgeCode: { color: COLORS.blue, fontFamily: 'monospace', fontSize: 15, fontWeight: '900' },
  orbCaption: { position: 'absolute', zIndex: 4, bottom: 18, color: 'rgba(255,255,255,.7)', fontFamily: bodyFont, fontSize: 8, lineHeight: 13, letterSpacing: 2, textAlign: 'center' },
  statsRow: { marginTop: 20, width: '54%', flexDirection: 'row', gap: 36 },
  statsRowCompact: { width: '100%', marginTop: 30, justifyContent: 'space-between', gap: 8 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statValue: { color: COLORS.ink, fontFamily: headingFont, fontSize: 27, fontWeight: '800', letterSpacing: -1.4 },
  statLabel: { paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: COLORS.line, color: COLORS.muted, fontFamily: bodyFont, fontSize: 8, lineHeight: 12, letterSpacing: 0.7 },
  ticker: { height: 58, backgroundColor: COLORS.blue, overflow: 'hidden', justifyContent: 'center', transform: [{ rotate: '-0.7deg' }, { scaleX: 1.02 }] },
  tickerTrack: { flexDirection: 'row', width: 1600 },
  tickerSet: { flexDirection: 'row', alignItems: 'center', gap: 24, marginRight: 24 },
  tickerText: { color: COLORS.white, fontFamily: headingFont, fontSize: 13, fontWeight: '800', letterSpacing: 1.5 },
  tickerStar: { color: '#AFC4FF', fontSize: 14 },
  section: { alignSelf: 'center', paddingVertical: 132 },
  sectionHeadingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginBottom: 54 },
  sectionHeadingStack: { flexDirection: 'column', alignItems: 'flex-start', gap: 24, marginBottom: 40 },
  sectionTitle: { color: COLORS.ink, fontFamily: headingFont, fontSize: 66, lineHeight: 65, fontWeight: '900', letterSpacing: -3.6 },
  sectionTitleCompact: { fontSize: 48, lineHeight: 48, letterSpacing: -2.7 },
  sectionIntro: { maxWidth: 430, color: COLORS.muted, fontFamily: bodyFont, fontSize: 16, lineHeight: 26 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  serviceCard: { minHeight: 410, padding: 24, borderRadius: 25, borderWidth: 1, borderColor: COLORS.line, ...Platform.select({ web: { transitionDuration: '180ms', cursor: 'default' }, default: { elevation: 1 } }) },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  serviceNumber: { fontFamily: headingFont, fontSize: 11, fontWeight: '700' },
  serviceIconWrap: { width: 84, height: 84, marginTop: 42, marginBottom: 34, alignSelf: 'center', borderWidth: 2, borderRadius: 27, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-5deg' }] },
  serviceIcon: { fontFamily: headingFont, fontSize: 50, fontWeight: '800' },
  serviceCopy: { flex: 1 },
  serviceTitle: { fontFamily: headingFont, fontSize: 26, lineHeight: 27, fontWeight: '800', letterSpacing: -1.3 },
  serviceBody: { marginTop: 13, fontFamily: bodyFont, fontSize: 13, lineHeight: 20 },
  workSection: { backgroundColor: COLORS.ink, paddingVertical: 132 },
  workInner: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 60 },
  workInnerStack: { flexDirection: 'column', alignItems: 'stretch', gap: 74 },
  workCopy: { alignItems: 'flex-start' },
  workTitle: { color: COLORS.white, fontFamily: headingFont, fontSize: 59, lineHeight: 58, fontWeight: '900', letterSpacing: -3.2 },
  workTitleCompact: { fontSize: 44, lineHeight: 45, letterSpacing: -2.3 },
  workBody: { maxWidth: 470, marginTop: 26, marginBottom: 32, color: '#AEB1BA', fontFamily: bodyFont, fontSize: 15, lineHeight: 25 },
  dashboardWrap: { width: '100%', alignItems: 'center' },
  dashboardShell: { width: '100%', minHeight: 410, borderWidth: 1, borderColor: '#383A42', borderRadius: 18, backgroundColor: '#17181D', overflow: 'visible', ...Platform.select({ web: { boxShadow: '0 44px 90px rgba(0,0,0,.38)' }, default: { elevation: 10 } }) },
  dashboardShellCompact: { minHeight: 315 },
  dashboardTopbar: { height: 45, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#30323A', flexDirection: 'row', alignItems: 'center', gap: 20 },
  windowDots: { flexDirection: 'row', gap: 5 },
  windowDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#51535A' },
  urlBar: { flex: 1, maxWidth: 300, paddingVertical: 7, borderRadius: 7, backgroundColor: '#22242A', alignItems: 'center' },
  urlText: { color: '#747780', fontFamily: bodyFont, fontSize: 8 },
  dashboardBody: { flex: 1, flexDirection: 'row' },
  dashboardRail: { width: 55, paddingTop: 16, borderRightWidth: 1, borderRightColor: '#30323A', alignItems: 'center', gap: 20 },
  miniBrand: { marginBottom: 8, color: COLORS.white, fontFamily: headingFont, fontSize: 17, fontWeight: '800' },
  railItem: { width: 18, height: 18, borderRadius: 5, backgroundColor: '#2B2D34' },
  railItemActive: { backgroundColor: COLORS.blue },
  dashboardContent: { flex: 1, padding: 19 },
  dashboardHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dashboardHeadingText: { color: COLORS.white, fontFamily: headingFont, fontSize: 14, fontWeight: '700' },
  dashboardAvatar: { width: 27, height: 27, borderRadius: 14, backgroundColor: '#292B32' },
  metricsRow: { marginTop: 20, flexDirection: 'row', gap: 9 },
  metric: { flex: 1, minWidth: 0, padding: 12, borderWidth: 1, borderColor: '#30323A', borderRadius: 10, backgroundColor: '#1C1E24', gap: 5 },
  metricLabel: { color: '#6E727D', fontSize: 6, letterSpacing: 0.8 },
  metricValue: { color: COLORS.white, fontFamily: headingFont, fontSize: 19, fontWeight: '700' },
  metricChange: { color: '#56D69B', fontSize: 7 },
  chartCard: { flex: 1, marginTop: 11, padding: 14, borderWidth: 1, borderColor: '#30323A', borderRadius: 10, backgroundColor: '#1C1E24' },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chartTitle: { color: COLORS.white, fontFamily: bodyFont, fontSize: 9, fontWeight: '600' },
  chartRange: { color: '#6E727D', fontFamily: bodyFont, fontSize: 7 },
  chart: { flex: 1, minHeight: 100, paddingTop: 16, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 },
  chartBar: { flex: 1, maxWidth: 22, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: COLORS.blue },
  liveLabel: { position: 'absolute', right: -11, top: -17, paddingHorizontal: 13, paddingVertical: 9, borderRadius: 8, backgroundColor: COLORS.white, flexDirection: 'row', alignItems: 'center', transform: [{ rotate: '5deg' }] },
  liveText: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green },
  processList: { marginTop: 54, borderTopWidth: 1, borderTopColor: COLORS.line },
  processRow: { minHeight: 116, paddingHorizontal: 8, paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: COLORS.line, flexDirection: 'row', alignItems: 'center', gap: 20 },
  processRowCompact: { alignItems: 'flex-start', paddingVertical: 26, gap: 12 },
  processNumber: { width: 52, color: COLORS.blue, fontFamily: headingFont, fontSize: 11, fontWeight: '800' },
  processTitle: { width: 250, color: COLORS.ink, fontFamily: headingFont, fontSize: 28, fontWeight: '800', letterSpacing: -1.2 },
  processBody: { flex: 1, maxWidth: 480, color: COLORS.muted, fontFamily: bodyFont, fontSize: 14, lineHeight: 22 },
  processArrow: { width: 24, color: COLORS.blue, fontSize: 21, fontWeight: '700' },
  contactOuter: { alignSelf: 'center', paddingBottom: 52 },
  contactCard: { minHeight: 500, padding: 64, borderRadius: 32, backgroundColor: COLORS.blue, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 50, overflow: 'hidden' },
  contactCardCompact: { minHeight: 660, paddingHorizontal: 24, paddingVertical: 55, borderRadius: 0, flexDirection: 'column', alignItems: 'stretch' },
  contactCopy: { zIndex: 2, flex: 1 },
  contactTitle: { color: COLORS.white, fontFamily: headingFont, fontSize: 78, lineHeight: 73, fontWeight: '900', letterSpacing: -4 },
  contactTitleCompact: { fontSize: 54, lineHeight: 51, letterSpacing: -2.8 },
  contactAction: { zIndex: 2, height: '100%', maxWidth: 350, alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 },
  contactActionCompact: { height: 'auto', maxWidth: '100%', alignItems: 'flex-start' },
  contactBody: { color: 'rgba(255,255,255,.76)', fontFamily: bodyFont, fontSize: 16, lineHeight: 26 },
  roundButton: { width: 150, height: 150, padding: 25, borderRadius: 75, backgroundColor: COLORS.white, alignItems: 'flex-start', justifyContent: 'space-between' },
  roundButtonPressed: { transform: [{ scale: 0.96 }] },
  roundButtonText: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 14, fontWeight: '800' },
  contactRingOuter: { position: 'absolute', width: 500, height: 500, right: -130, bottom: -270, borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', borderRadius: 250 },
  contactRingInner: { position: 'absolute', width: 360, height: 360, right: -60, bottom: -200, borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', borderRadius: 180 },
  footer: { minHeight: 185, alignSelf: 'center', paddingVertical: 42, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 },
  footerCompact: { flexDirection: 'column', justifyContent: 'center' },
  footerText: { color: COLORS.muted, fontFamily: bodyFont, fontSize: 12 },
  footerLinks: { flexDirection: 'row', gap: 20 },
  footerLink: { color: COLORS.ink, fontFamily: bodyFont, fontSize: 13, fontWeight: '700' },
  copyright: { width: '100%', paddingTop: 18, borderTopWidth: 1, borderTopColor: COLORS.line, color: '#999DA5', fontFamily: bodyFont, fontSize: 9, textAlign: 'center' },
});
