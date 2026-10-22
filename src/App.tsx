import { useState } from 'react';
import AIAssistantTab from './components/AIAssistantTab';
import CareerTab from './components/CareerTab';
import CalculatorTab from './components/CalculatorTab';
import HomeTab from './components/HomeTab';
import InstallMobileModal from './components/InstallMobileModal';
import MobileFrame from './components/MobileFrame';
import NewsDetailModal from './components/NewsDetailModal';
import SchoolDetailModal from './components/SchoolDetailModal';
import SearchTab from './components/SearchTab';
import { NewsItem, University } from './types/unipath';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'career' | 'calc' | 'ai'>('home');
  const [isMobileOnlyMode, setIsMobileOnlyMode] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isMobileInstallModalOpen, setIsMobileInstallModalOpen] = useState(false);

  return (
    <>
      <MobileFrame
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        isMobileOnlyMode={isMobileOnlyMode}
        onToggleMode={() => setIsMobileOnlyMode((prev) => !prev)}
        onOpenMobileInstallModal={() => setIsMobileInstallModalOpen(true)}
      >
        {activeTab === 'home' && (
          <HomeTab
            onNavigateTab={setActiveTab}
            onSelectUniversity={setSelectedUniversity}
            onSelectNews={setSelectedNews}
          />
        )}

        {activeTab === 'search' && (
          <SearchTab
            onSelectUniversity={setSelectedUniversity}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'career' && (
          <CareerTab onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'calc' && (
          <CalculatorTab onSelectUniversity={setSelectedUniversity} />
        )}

        {activeTab === 'ai' && (
          <AIAssistantTab />
        )}
      </MobileFrame>

      {/* University Detail Modal */}
      <SchoolDetailModal
        university={selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
        onNavigateTab={setActiveTab}
      />

      {/* News Detail Modal */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      {/* Mobile Install & QR Modal */}
      <InstallMobileModal
        isOpen={isMobileInstallModalOpen}
        onClose={() => setIsMobileInstallModalOpen(false)}
      />
    </>
  );
}
