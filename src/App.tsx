import { IconUser } from '@tabler/icons-react';
import Button from './components/Buttton.Component';
import { useState } from 'react';

function App() {
  const [first, setfirst] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button size='xs' radius='md' color='var(--color-blue-6)' leftsection={<IconUser />} loading={first}>
        Button
      </Button>
      <Button size='sm' radius='md' color='var(--color-cyan-8)' leftsection={<IconUser />} loading={first}>
        Button
      </Button>
      <Button size='md' radius='md' color='var(--color-green-6)' leftsection={<IconUser />}>
        Button
      </Button>
      <Button size='lg' radius='md' color='var(--color-yellow-8)' leftsection={<IconUser />}>
        Button
      </Button>
      <Button size='xl' radius='md' color='var(--color-gray-8)' leftsection={<IconUser />}>
        Button
      </Button>
      <Button size='md' radius='md' variant='gradient'>
        Test
      </Button>

      <Button size='md' radius='md' variant='gradient' onClick={() => setfirst((prev) => !prev)} from='#12b886' to='#7950f2' deg={81}>
        Test
      </Button>
    </div>
  );
}

export default App;
