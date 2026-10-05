import { CaseMobile } from '@/components/case/case-mobile';
import { caseStudyPage } from '@/screens/case-study';

export { generateMetadata, generateStaticParams } from '@/screens/case-study';
export const dynamicParams = false;

export default caseStudyPage(CaseMobile);
