import React, { useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms' | 'faq';
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-bold text-slate-900">{question}</span>
        {isOpen ? <ChevronUp className="text-brand-600 flex-shrink-0" /> : <ChevronDown className="text-slate-400 flex-shrink-0" />}
      </button>
      <div 
        className={`px-6 text-slate-600 leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const Legal: React.FC<LegalProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Privacy Policy</h1>
            <p className="text-slate-500 mb-12">Last updated: October 24, 2023</p>
            
            <div className="prose prose-lg prose-slate max-w-none space-y-12">
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h3>
                <p>
                  FOCS ("us", "we", or "our") operates the https://focs.tech website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
                <p>
                  We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Information Collection and Use</h3>
                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                
                <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Types of Data Collected</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City.</li>
                  <li><strong>Usage Data:</strong> We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
                  <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Use of Data</h3>
                <p>FOCS uses the collected data for various purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer care and support</li>
                  <li>To provide analysis or valuable information so that we can improve the Service</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Transfer of Data</h3>
                <p>
                  Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                </p>
                <p>
                  If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Disclosure of Data</h3>
                <p>FOCS may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To comply with a legal obligation</li>
                  <li>To protect and defend the rights or property of FOCS</li>
                  <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>To protect the personal safety of users of the Service or the public</li>
                  <li>To protect against legal liability</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">6. Security of Data</h3>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-none pl-0 mt-4">
                  <li>By email: legal@focs.tech</li>
                  <li>By visiting this page on our website: https://focs.tech/contact</li>
                </ul>
              </section>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Terms & Conditions</h1>
            <p className="text-slate-500 mb-12">Last updated: October 24, 2023</p>

            <div className="prose prose-lg prose-slate max-w-none space-y-12">
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h3>
                <p>
                  Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://focs.tech website (the "Service") operated by FOCS ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Intellectual Property</h3>
                <p>
                  The Service and its original content, features and functionality are and will remain the exclusive property of FOCS and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of FOCS.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Academy & Training Services</h3>
                <p>
                  For users enrolling in "Its Coder Camp" or other training programs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Enrollment:</strong> Enrollment is subject to availability and payment of applicable fees.</li>
                  <li><strong>Materials:</strong> All training materials provided are for personal use only and may not be redistributed.</li>
                  <li><strong>Certification:</strong> Certificates are awarded based on successful completion of project requirements and attendance. We reserve the right to withhold certification for non-compliance.</li>
                  <li><strong>Refunds:</strong> Refund policies vary by specific course and will be outlined during the registration process. Generally, fees are non-refundable once the batch has commenced.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Links To Other Web Sites</h3>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by FOCS. FOCS has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that FOCS shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h3>
                <p>
                  In no event shall FOCS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">6. Governing Law</h3>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Karnataka, India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">7. Changes</h3>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="animate-fade-in">
             <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">Frequently Asked Questions</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Everything you need to know about our services, academy, and operations.
              </p>
            </div>

            <div className="space-y-12 max-w-4xl mx-auto">
              
              {/* Software Services Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center text-sm">01</span>
                  Software Services
                </h2>
                <div className="space-y-4">
                  <FAQItem 
                    question="What technology stacks do you specialize in?" 
                    answer="We are technology agnostic but specialize in modern stacks. Our core expertise lies in MERN (MongoDB, Express, React, Node.js) for web apps, Python/Django/FastAPI for backend and AI/ML integration, and Flutter/React Native for mobile development. For Enterprise AI, we extensively use TensorFlow, PyTorch, and OpenAI APIs."
                  />
                  <FAQItem 
                    question="How do you handle project pricing?" 
                    answer="We offer two models: Fixed Cost and Time & Material. For well-defined scopes, we provide a Fixed Cost quote with clear milestones. For evolving products or long-term partnerships, the Time & Material model allows for greater flexibility. We are transparent with our pricing and estimates."
                  />
                  <FAQItem 
                    question="Do you provide post-deployment support?" 
                    answer="Yes, absolutely. We offer a standard warranty period (typically 30-90 days) for bug fixes after deployment. Beyond that, we offer Annual Maintenance Contracts (AMC) to ensure your software remains updated, secure, and performant."
                  />
                </div>
              </div>

              {/* Academy Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center text-sm">02</span>
                  Its Coder Camp (Academy)
                </h2>
                <div className="space-y-4">
                  <FAQItem 
                    question="Is the training online or offline?" 
                    answer="Our flagship programs are conducted offline at our Bangalore campus to ensure immersive learning and direct mentorship. However, we do offer hybrid options for working professionals and specific online modules for remote learners."
                  />
                  <FAQItem 
                    question="Do you guarantee placement?" 
                    answer="While no institute can honestly guarantee 100% placement, we have a stellar track record. We provide robust placement assistance, including resume building, mock interviews, and access to our hiring partner network. Most of our 'job-ready' certified students secure offers within 3 months of completion."
                  />
                  <FAQItem 
                    question="What are the prerequisites for joining?" 
                    answer="For our foundation courses, no prior coding experience is required—just logical thinking and a willingness to learn. For advanced AI/ML tracks, basic proficiency in Python and mathematics is recommended. We conduct a screening test for advanced batches."
                  />
                </div>
              </div>

              {/* General Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center text-sm">03</span>
                  General & Careers
                </h2>
                <div className="space-y-4">
                  <FAQItem 
                    question="Where is FOCS located?" 
                    answer="Our headquarters and main development center are located in Tech Park, Sector 5, Bangalore, India. We also have satellite presence through our remote teams across India."
                  />
                  <FAQItem 
                    question="How can I apply for an internship?" 
                    answer="We open internship applications three times a year (Summer, Winter, and Spring). You can apply through our Careers page. Top performers from our 'Its Coder Camp' are often given priority for internal internship positions."
                  />
                  <FAQItem 
                    question="Do you work with international clients?" 
                    answer="Yes, a significant portion of our client base is international, primarily from the US, UK, and UAE. We are well-versed in remote collaboration and managing time-zone overlaps effectively."
                  />
                </div>
              </div>

            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default Legal;