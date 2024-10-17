import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import type { Work } from 'types/work';

type Props = {
  list: Work[];
};

export default function WorkTabs({ list }: Props) {
  return (
    <TabGroup className='flex flex-col md:flex-row w-full'>
      <TabList className='flex md:flex-col md:basis-1/4 pb-2 md:pb-0 md:pr-2 overflow-x-auto md:overflow-x-visible'>
        {list.map(({ name }) => (
          <Tab
            key={name}
            className={({ selected }) =>
              `w-full p-2 sm:p-4 rounded text-sm font-mono ${
                selected
                  ? 'text-wm-carbon bg-wm-oxygen font-semibold'
                  : 'text-wm-hydrogen hover:bg-wm-carbon-600 hover:text-wm-hydrogen'
              }`
            }
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className='border-t md:basis-3/4 md:border-t-0 md:border-l border-wm-carbon-600 pt-2 md:pt-0 md:pl-2'>
        {list.map(
          ({ name, title, at, atURL, description, date, activities }) => (
            <TabPanel key={name}>
              <h2 className='font-bold'>
                {title}{' '}
                <a
                  href={atURL}
                  target='blank'
                  aria-label='Workplace Site'
                  className='text-wm-oxygen-300'
                >
                  @{at}
                </a>
              </h2>
              <span className='text-sm font-mono'>{date}</span>
              <p className='py-2'>{description}</p>
              <div className='py-2'>
                Relevant skills:
                <ul className="px-4 list-['⇢'] marker:text-wm-oxygen">
                  {activities.map((activity, i) => (
                    <li key={i} className='p-1'>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>
          )
        )}
      </TabPanels>
    </TabGroup>
  );
}
