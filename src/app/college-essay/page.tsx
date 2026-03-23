'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

const PROMPTS = [
  { id: '1', label: 'Prompt 1: Background, Identity, Interest, or Talent', text: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.' },
  { id: '2', label: 'Prompt 2: Lessons from Obstacles', text: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?' },
  { id: '3', label: 'Prompt 3: Questioned or Challenged a Belief', text: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?' },
  { id: '4', label: 'Prompt 4: Act of Kindness / Gratitude / Unfairness', text: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?' },
  { id: '5', label: 'Prompt 5: Personal Growth / New Understanding', text: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.' },
  { id: '6', label: 'Prompt 6: Topic That Captivates You', text: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?' },
  { id: '7', label: 'Prompt 7: Topic of Your Choice', text: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.' },
];

export default function CollegeEssayPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [promptId, setPromptId] = useState('1');
  const [notes, setNotes] = useState('');

  const selectedPrompt = PROMPTS.find(p => p.id === promptId)!;

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="🎓" title="College Essay Helper" description="Get brainstorming help, angles, and outlines for Common App essays." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (loading) return;
    generate(`You are an experienced college admissions counselor who has helped hundreds of students get into top universities. Help this student brainstorm and plan their Common App essay.

**Selected Prompt:**
"${selectedPrompt.text}"

${notes ? `**Student's Notes/Ideas:** "${notes}"` : '**Student has not provided specific notes yet — give general guidance for this prompt.**'}

## 🎓 College Essay Guide: ${selectedPrompt.label}

### 📋 Understanding the Prompt
- **What admissions officers are really looking for:** [Explain the deeper purpose of this prompt]
- **Common mistakes students make:** [3-4 pitfalls to avoid]
- **What makes an answer stand out:** [Key differentiators]

### 🧠 Brainstorming Questions
Ask yourself these questions to find your unique angle:
1. [Thought-provoking question specific to this prompt]
2. [Another question]
3. [Another question]
4. [Another question]
5. [Another question]
${notes ? '\nBased on your notes, consider these additional questions:\n6. [Personalized question]\n7. [Personalized question]' : ''}

### 💡 3 Potential Angles

**Angle 1: [Creative title]**
- **The hook:** [Opening sentence/scene idea]
- **The story:** [Brief outline of the narrative arc]
- **The insight:** [What the reader learns about you]
- **Why it works:** [Why this angle is effective for this prompt]

**Angle 2: [Creative title]**
- **The hook:** [Opening sentence/scene idea]
- **The story:** [Brief outline]
- **The insight:** [What it reveals]
- **Why it works:** [Effectiveness]

**Angle 3: [Creative title]**
- **The hook:** [Opening sentence/scene idea]
- **The story:** [Brief outline]
- **The insight:** [What it reveals]
- **Why it works:** [Effectiveness]

### 📝 Outline Template
For whichever angle you choose:

**Paragraph 1 — The Hook (2-3 sentences)**
Start with a specific moment, scene, or image. Drop the reader into action. NO generic openings like "I've always been..."

**Paragraph 2-3 — The Story (5-7 sentences)**
Develop the narrative with specific details. Show, don't tell. Include dialogue if possible.

**Paragraph 4 — The Turn (3-4 sentences)**
The moment of realization, change, or growth. This is where the essay shifts from story to insight.

**Paragraph 5 — The Reflection (3-4 sentences)**
What you learned, how you changed, what it means for your future. Connect to your values/goals.

### ✍️ Writing Tips for This Prompt
1. **Voice:** [Specific advice on tone and voice]
2. **Details:** [What kinds of specific details to include]
3. **Structure:** [Structural advice specific to this prompt]
4. **Length:** Keep it under 650 words. Every sentence must earn its place.
5. **Authenticity:** [How to be genuine without being cliché]

### ⚠️ Red Flags to Avoid
- [Specific cliché or mistake for this prompt]
- [Another one]
- [Another one]

### 📖 Strong Opening Sentence Examples
3 example opening sentences (NOT to copy, but to show the style/energy level that works):
1. "[Example]"
2. "[Example]"
3. "[Example]"`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="🎓" title="College Essay Helper" description="Get brainstorming help, angles, and outlines for Common App essays." aiPowered />
      <Card className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Common App Prompt</label>
            <Select value={promptId} onChange={e => setPromptId(e.target.value)}>
              {PROMPTS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </Select>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">{selectedPrompt.text}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Notes/Ideas (optional)</label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any ideas, experiences, or themes you're considering writing about..." rows={3} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <><Spinner /> Brainstorming...</> : 'Get Essay Help'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && (
        <Card>
          <MarkdownRenderer content={output} />
        </Card>
      )}
    </div>
  );
}
