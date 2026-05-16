export type Milestone = {
  title: string;
  skills: string[];
};

export type Phase = {
  number: number;
  name: string;
  level: string;
  duration: string;
  milestones: Milestone[];
};

export type InstrumentRoadmap = {
  instrument: string;
  tagline: string;
  phases: Phase[];
};

const roadmaps: Record<string, InstrumentRoadmap> = {
  Vocals: {
    instrument: "Vocals",
    tagline: "From your first note to the concert stage — find your voice.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Breathing & Posture", skills: ["Diaphragmatic breathing", "Correct standing posture", "Relaxed jaw and neck"] },
          { title: "Pitch Matching", skills: ["Ear training basics", "Matching single pitches", "Singing simple intervals"] },
          { title: "Vocal Warm-Ups", skills: ["Lip trills and sirens", "5-note scale warm-ups", "Resonance exercises"] },
          { title: "Voice Care", skills: ["Hydration habits", "Vocal rest principles", "Recognising strain vs. effort"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–8",
        milestones: [
          { title: "Chest & Head Voice", skills: ["Identifying your registers", "Smooth register transitions", "Exercises for each register"] },
          { title: "Dynamics & Expression", skills: ["Crescendo and decrescendo", "Emotional phrasing", "Consonant clarity"] },
          { title: "Vibrato Foundations", skills: ["Natural vibrato vs forced", "Oscillation exercises", "Controlled application"] },
          { title: "Song Interpretation", skills: ["Storytelling through lyrics", "Breath marks and phrasing", "Genre awareness"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 9–15",
        milestones: [
          { title: "Mixed Voice Mastery", skills: ["Blending chest and head seamlessly", "High note access without strain", "Power without tension"] },
          { title: "Style & Genre", skills: ["Gospel runs and riffs", "R&B melisma", "Classical diction"] },
          { title: "Microphone Technique", skills: ["Distance and proximity", "Feedback avoidance", "Stage monitoring use"] },
          { title: "Performance Skills", skills: ["Stage presence", "Eye contact and movement", "Managing nerves"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 16+",
        milestones: [
          { title: "Original Arrangement", skills: ["Vocal harmonies", "A cappella arrangement", "Personal style development"] },
          { title: "Studio Recording", skills: ["Headphone mix awareness", "Multiple takes and comp", "Booth etiquette"] },
          { title: "Live Performance", skills: ["Full set performance", "Crowd engagement", "Improvisation in context"] },
          { title: "Teaching Readiness", skills: ["Explaining technique", "Ear for student errors", "Lesson planning basics"] },
        ],
      },
    ],
  },

  Piano: {
    instrument: "Piano",
    tagline: "Black keys, white keys — and the infinite space between them.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Posture & Hand Position", skills: ["Bench height and distance", "Curved fingers", "Wrist alignment"] },
          { title: "Note Reading", skills: ["Treble clef notes (C–G)", "Bass clef notes", "Middle C position"] },
          { title: "Finger Numbering", skills: ["Assigning fingers 1–5", "Thumb crossing exercises", "Independent finger control"] },
          { title: "Basic Rhythm", skills: ["Quarter, half, whole notes", "4/4 time signature", "Clapping before playing"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Hands Together", skills: ["Simple parallel motion", "Basic coordination drills", "Easy two-hand pieces"] },
          { title: "Scales & Arpeggios", skills: ["C, G, D major scales", "Contrary motion", "One-octave arpeggios"] },
          { title: "Dynamics & Touch", skills: ["Piano vs forte", "Legato and staccato", "Pedal introduction"] },
          { title: "Sight Reading", skills: ["Reading ahead technique", "Slow first-read method", "Simple sight-reading pieces"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–18",
        milestones: [
          { title: "Chord Inversions", skills: ["1st and 2nd inversions", "Smooth voice leading", "Alberti bass patterns"] },
          { title: "Music Theory", skills: ["Key signatures", "Intervals and triads", "Chord progressions I–IV–V–I"] },
          { title: "Improvisation Intro", skills: ["Blues scale on piano", "Left hand comp patterns", "Call and response"] },
          { title: "Advanced Repertoire", skills: ["Classical pieces (grade 3–5)", "Gospel chords", "Contemporary arrangements"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 19+",
        milestones: [
          { title: "ABRSM Preparation", skills: ["Exam pieces selection", "Sight reading under pressure", "Aural tests"] },
          { title: "Composition", skills: ["Melody writing", "Chord progression design", "Lead sheet creation"] },
          { title: "Accompaniment", skills: ["Accompanying vocalists", "Playing from chord charts", "Transposition"] },
          { title: "Performance Mastery", skills: ["Recital repertoire", "Memory techniques", "Stage confidence"] },
        ],
      },
    ],
  },

  "Guitar (Acoustic)": {
    instrument: "Guitar (Acoustic)",
    tagline: "Six strings. Endless stories. Your journey starts here.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Holding the Guitar", skills: ["Sitting posture", "Fretting hand position", "Picking hand relaxation"] },
          { title: "Open Chords", skills: ["E minor, A minor", "C major, G major", "D major"] },
          { title: "Strumming Basics", skills: ["Downstroke control", "Simple patterns (D-D-U)", "Chord changes on beat"] },
          { title: "Fingerpicking Intro", skills: ["Thumb-index-middle assignment", "Basic Travis picking", "Alternating bass notes"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Barre Chords", skills: ["F major barre shape", "B minor barre shape", "Shifting barre positions"] },
          { title: "Scale Positions", skills: ["E-shape minor pentatonic", "CAGED system intro", "Single-note melodies"] },
          { title: "Rhythm & Timing", skills: ["Syncopated strumming", "Playing with a metronome", "Muting technique"] },
          { title: "Song Repertoire", skills: ["3–4 full songs", "Chord charts and tabs", "Performance pacing"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–18",
        milestones: [
          { title: "Fingerpicking Patterns", skills: ["Arpeggiated chord rolls", "Melodic fingerstyle", "Two-voice playing"] },
          { title: "Music Theory on Guitar", skills: ["Intervals across the neck", "Building chords from scales", "Capo transposition"] },
          { title: "Alternate Tunings", skills: ["DADGAD intro", "Open G tuning", "Slide guitar basics"] },
          { title: "Songwriting Basics", skills: ["Chord progression writing", "Melody over chords", "Verse-chorus structure"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 19+",
        milestones: [
          { title: "Arrangement Skills", skills: ["Solo guitar arrangements", "Orchestrating melody + bass", "Original compositions"] },
          { title: "Genre Fluency", skills: ["Gospel fingerstyle", "Afrobeats rhythms", "Classical guitar techniques"] },
          { title: "Performance Readiness", skills: ["Full set of 5+ songs", "Audience engagement", "Recording a demo"] },
          { title: "Ensemble Playing", skills: ["Playing in a band", "Reading lead sheets", "Dynamic listening"] },
        ],
      },
    ],
  },

  "Bass Guitar": {
    instrument: "Bass Guitar",
    tagline: "The heartbeat of every band — learn to hold it all together.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Instrument Anatomy", skills: ["Strings, frets, pickups", "Amp settings basics", "Strap and sitting position"] },
          { title: "Root Note Playing", skills: ["Locking with the kick drum", "Simple bass lines", "Open string exercises"] },
          { title: "Finger Technique", skills: ["Two-finger plucking", "Fretting hand muting", "String crossing"] },
          { title: "Basic Groove", skills: ["Quarter note grooves", "8th note feels", "Staying in the pocket"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Scales & Patterns", skills: ["Major and minor scales", "Pentatonic bass patterns", "One-octave runs"] },
          { title: "Slap Bass Intro", skills: ["Thumb technique", "Pop technique", "Alternating slap-pop"] },
          { title: "Reading Notation", skills: ["Bass clef reading", "Rhythm notation", "Tab and notation together"] },
          { title: "Playing With a Drummer", skills: ["Kick drum locking", "Snare anticipation", "Groove conversation"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–17",
        milestones: [
          { title: "Advanced Grooves", skills: ["16th note funk patterns", "Ghost notes", "Syncopation mastery"] },
          { title: "Music Theory for Bass", skills: ["Chord tones and arpeggios", "Walking bass lines", "Modes introduction"] },
          { title: "Genre Styles", skills: ["Gospel bass patterns", "Afrobeats feel", "Reggae one-drop"] },
          { title: "Improvisation", skills: ["Chord tone soloing", "Call and response bass", "Dynamic control"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 18+",
        milestones: [
          { title: "Band Dynamics", skills: ["Following the arrangement", "Arranging bass parts", "Live mix awareness"] },
          { title: "Studio Session Skills", skills: ["Playing to a click", "Multiple takes", "Signal chain understanding"] },
          { title: "Bass Line Composition", skills: ["Writing original lines", "Adapting to chord changes", "Cross-genre writing"] },
          { title: "Performance", skills: ["Live bass set", "Stage monitoring", "Equipment troubleshooting"] },
        ],
      },
    ],
  },

  "Electric Guitar": {
    instrument: "Electric Guitar",
    tagline: "Plug in. Turn up. Unleash what's inside you.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Amp & Tone Basics", skills: ["Gain, bass, mid, treble", "Clean vs distorted tones", "Volume and output levels"] },
          { title: "Power Chords", skills: ["E5, A5, D5 shapes", "Palm muting", "Chord-riff combinations"] },
          { title: "Pick Technique", skills: ["Alternate picking basics", "Down-picking speed", "Pick angle and tone"] },
          { title: "Basic Riffs", skills: ["Blues shuffle riff", "Rock riff patterns", "Simple iconic riffs"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Pentatonic Scales", skills: ["Minor pentatonic box 1", "Scale sequences", "Playing over backing tracks"] },
          { title: "String Bending", skills: ["Half and whole step bends", "Vibrato on bends", "Bend intonation"] },
          { title: "Barre Chords", skills: ["E-shape barre", "A-shape barre", "Moving cleanly up the neck"] },
          { title: "Blues Vocabulary", skills: ["Blues scale", "Lick library building", "12-bar blues context"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–18",
        milestones: [
          { title: "Lead Guitar Techniques", skills: ["Legato (hammer-ons/pull-offs)", "Tapping intro", "Sweep picking basics"] },
          { title: "Effects Pedals", skills: ["Overdrive, delay, reverb", "Pedalboard signal chain", "Expression pedals"] },
          { title: "Genre Techniques", skills: ["Rock soloing", "Jazz chord melody", "Funk rhythms (16th note muting)"] },
          { title: "Theory for Lead Guitar", skills: ["CAGED system", "Modal shapes", "Chord-scale relationships"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 19+",
        milestones: [
          { title: "Improvisation", skills: ["Ear-based soloing", "Motif development", "Dynamic storytelling in solos"] },
          { title: "Original Composition", skills: ["Song structure", "Riff-based writing", "Melody over chords"] },
          { title: "Live Performance", skills: ["Set list planning", "Pedalboard live use", "Stage presence"] },
          { title: "Recording Techniques", skills: ["Mic placement for amps", "DI recording", "Guitar production basics"] },
        ],
      },
    ],
  },

  "Trumpet / Brass": {
    instrument: "Trumpet / Brass",
    tagline: "Command attention with every breath — the brass experience.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Embouchure Formation", skills: ["Lip buzzing on mouthpiece", "Relaxed corners", "Air stream direction"] },
          { title: "Breath Control", skills: ["Full breath cycles", "Steady air stream", "Breathing from the diaphragm"] },
          { title: "First Notes", skills: ["G, F, E on trumpet", "Valve coordination", "Tone production"] },
          { title: "Basic Tonguing", skills: ["Single tonguing (ta)", "Legato vs staccato", "Tongue placement"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Scale Building", skills: ["C and G major scales", "Chromatic scale", "Scale in tongued 8ths"] },
          { title: "Lip Slurs", skills: ["Harmonic series navigation", "Flexibility exercises", "Register transitions"] },
          { title: "Simple Repertoire", skills: ["Hymn tunes", "Folk melodies", "Simple band parts"] },
          { title: "Articulation Types", skills: ["Staccato, legato, accent", "Slurred passages", "Tongued vs slurred contrast"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–17",
        milestones: [
          { title: "Range Extension", skills: ["Double high C approach", "Pedal tones for strength", "High register endurance"] },
          { title: "Ensemble Playing", skills: ["Blending in brass section", "Following a conductor", "Tuning in ensemble"] },
          { title: "Classical Repertoire", skills: ["Haydn Concerto excerpts", "Orchestral etudes", "Sight-reading in context"] },
          { title: "Advanced Articulation", skills: ["Double and triple tonguing", "Trills", "Mute technique (straight mute)"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 18+",
        milestones: [
          { title: "Jazz Improvisation", skills: ["Blues scale on trumpet", "12-bar jazz blues", "Trading fours"] },
          { title: "Audition Preparation", skills: ["Orchestral excerpts", "Sight-reading cold", "Solo performance"] },
          { title: "High Register Mastery", skills: ["Lead trumpet endurance", "Consistency above high C", "Endurance sets"] },
          { title: "Performance", skills: ["Full recital programme", "Church/band context", "Studio session skills"] },
        ],
      },
    ],
  },

  Drums: {
    instrument: "Drums",
    tagline: "Every great song is built on a great groove. Become the foundation.",
    phases: [
      {
        number: 1, name: "Foundation", level: "Beginner", duration: "Months 1–3",
        milestones: [
          { title: "Stick Grip", skills: ["Matched grip technique", "Rebound control", "Wrist vs finger technique"] },
          { title: "Basic Beat", skills: ["Hi-hat 8th notes", "Snare on 2 and 4", "Kick on 1 and 3"] },
          { title: "Kick Drum Control", skills: ["Heel-up vs heel-down", "Single kicks with consistency", "Kick + snare independence"] },
          { title: "Counting Out Loud", skills: ["1-e-and-a subdivision", "Counting while playing", "Internalising the pulse"] },
        ],
      },
      {
        number: 2, name: "Development", level: "Elementary", duration: "Months 4–9",
        milestones: [
          { title: "Rudiments", skills: ["Single stroke roll", "Double stroke roll", "Paradiddle (RLRR LRLL)"] },
          { title: "Fill Patterns", skills: ["4-beat fills", "2-beat fills in context", "Transitioning fills to groove"] },
          { title: "Reading Drum Notation", skills: ["Standard notation symbols", "Reading 4-bar patterns", "Chart reading"] },
          { title: "Click Track Discipline", skills: ["Playing to a metronome", "Staying in the pocket", "Tempo consistency"] },
        ],
      },
      {
        number: 3, name: "Proficiency", level: "Intermediate", duration: "Months 10–17",
        milestones: [
          { title: "Genre Grooves", skills: ["Gospel triplet feel", "Afrobeats patterns", "Funk 16th-note grooves"] },
          { title: "Ghost Notes", skills: ["Quiet snare ghost notes", "Ghost note in 16th patterns", "Dynamic layering"] },
          { title: "Polyrhythm Basics", skills: ["3 against 4", "Cross-rhythms", "African rhythmic concepts"] },
          { title: "Double Bass Intro", skills: ["Alternating 8ths on two kicks", "16th note double bass", "Endurance sets"] },
        ],
      },
      {
        number: 4, name: "Mastery", level: "Advanced", duration: "Month 18+",
        milestones: [
          { title: "Recording Session Skills", skills: ["Studio headphone monitoring", "Click-locked consistency", "Producer communication"] },
          { title: "Live Performance", skills: ["Full band stage playing", "In-ear monitors", "Set list endurance"] },
          { title: "Improvisation & Soloing", skills: ["Melodic drumming", "Motivic development", "Conversation with the band"] },
          { title: "Teaching Fundamentals", skills: ["Breaking down rudiments for students", "Identifying timing issues", "Lesson design"] },
        ],
      },
    ],
  },

  "After-School Programs": {
    instrument: "After-School Programs",
    tagline: "Where school ends and music begins — a structured journey for young learners.",
    phases: [
      {
        number: 1, name: "Exploration", level: "Discovery", duration: "Weeks 1–6",
        milestones: [
          { title: "Instrument Discovery", skills: ["Try piano, guitar, drums, and vocals", "Identify favourite instrument", "Group instrument demonstration"] },
          { title: "Group Singing", skills: ["Unison singing exercises", "Simple nursery rounds", "Call and response"] },
          { title: "Rhythm Activities", skills: ["Body percussion", "Clapping patterns", "Drum circle basics"] },
          { title: "Music & Stories", skills: ["Music history through stories", "Famous musicians for kids", "What music means to me"] },
        ],
      },
      {
        number: 2, name: "Foundation", level: "Beginner", duration: "Months 2–5",
        milestones: [
          { title: "Chosen Instrument Basics", skills: ["First lessons on chosen instrument", "Posture and safety", "Making first sounds"] },
          { title: "Music Notation Intro", skills: ["Reading rhythm cards", "Staff and clef recognition", "Note names (C D E F G)"] },
          { title: "Ensemble Participation", skills: ["Playing in a group setting", "Listening to others", "Starting together"] },
          { title: "Music Theory Games", skills: ["Interval ear games", "Flashcard note names", "Rhythm dictation"] },
        ],
      },
      {
        number: 3, name: "Development", level: "Elementary", duration: "Months 6–10",
        milestones: [
          { title: "Growing Repertoire", skills: ["3 songs on chosen instrument", "Simple hymns", "Familiar melodies"] },
          { title: "Solo Moments", skills: ["Short solo performance in class", "Recital preparation", "Managing nerves basics"] },
          { title: "Theory Fundamentals", skills: ["Major scale construction", "Simple chord concept", "Listening and identifying"] },
          { title: "Composition Play", skills: ["Create a 4-bar melody", "Name your piece", "Play it for the group"] },
        ],
      },
      {
        number: 4, name: "Performance", level: "Showcase", duration: "Month 11+",
        milestones: [
          { title: "School Recital", skills: ["Stage performance", "Full piece from memory", "Bow and audience acknowledgement"] },
          { title: "Ensemble Concert", skills: ["Group piece performance", "Costume and presentation", "Post-show reflection"] },
          { title: "Certificate Presentation", skills: ["Programme completion certificate", "Progress portfolio review", "Goal-setting for next term"] },
          { title: "Continued Learning Path", skills: ["Pathway to individual lessons", "ABRSM grade 1 preparation", "Next steps discussion"] },
        ],
      },
    ],
  },
};

export function getRoadmap(instrument: string): InstrumentRoadmap | undefined {
  return roadmaps[instrument];
}

export function instrumentToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function slugToRoadmap(slug: string): InstrumentRoadmap | undefined {
  const entry = Object.entries(roadmaps).find(
    ([name]) => instrumentToSlug(name) === slug
  );
  return entry?.[1];
}
