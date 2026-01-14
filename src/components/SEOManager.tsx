import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, injectStructuredData } from '@/utils/seo';
import { 
  getWebsiteStructuredData, 
  getOrganizationStructuredData, 
  getMedicalOrganizationStructuredData,
  getServiceStructuredData 
} from '@/utils/structuredData';

export default function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    updatePageSEO(location.pathname);
    
    injectStructuredData('organization');
    injectStructuredData('medicalOrganization');
    
    injectAdditionalStructuredData('website', getWebsiteStructuredData());
    injectAdditionalStructuredData('org', getOrganizationStructuredData());
    injectAdditionalStructuredData('medical', getMedicalOrganizationStructuredData());
    injectAdditionalStructuredData('service', getServiceStructuredData());
    
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function injectAdditionalStructuredData(id: string, data: any) {
  const scriptId = `structured-data-${id}`;
  let script = document.getElementById(scriptId);
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}
