import { CaseDesktop } from '@/components/case/case-desktop';
import { caseStudyPage } from '@/screens/case-study';

export { generateMetadata, generateStaticParams } from '@/screens/case-study';
export const dynamicParams = false;

export default caseStudyPage(CaseDesktop);
