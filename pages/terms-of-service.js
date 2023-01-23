import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

export default function TermsAndConditions() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Terms of Service - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div className="px-3 md:px-10 lg:px-20 xl:px-30 py-24 bg-white text-justify">
        <div className="prose prose-lg mx-auto max-w-7xl rounded-2xl">
          <div className="p-4 flex justify-center items-center text-3xl font-serif">
            TERMS OF SERVICE AGREEMENT
          </div>

          <div className="text-md p-4  text-gray-700">
            The Services (defined below) are provided by Nirmaan Learning
            Portal, an NGO which has impacted 1+ million beneficiaries through
            Education, Livelihoods and Social Leadership, having its office at
            Flat No:401, Jai Hind Enclave, Madhapur, Hyderabad, Telangana
            -500081 (hereinafter referred to as &quot;Nirmaan Learning
            Platform&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot; as
            the context may require). These Terms of Use (&quot;Terms&quot;)
            govern your use of Nirmaan Learning Platform website and services
            (&quot;Services&quot;). As some of our Services may be software that
            is downloaded to your computer, phone, tablet, or other device, you
            agree that we may update this website, and that these Terms will
            apply to such updates. These Terms, including the policies
            referenced in these Terms, represent a binding contract between you
            and us with regard to the Services. You indicate your agreement to
            these Terms by clicking or tapping on a button indicating your
            acceptance of these Terms, by executing a document that references
            them, or by using the Services. Therefore, please read these Terms
            carefully, and contact us at Email id if you have any questions.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Terms Of Service
          </div>

          <div className=" text-md p-4  text-gray-700 space-y-3">
            <p>
              Registration and Information. You need not register with us to
              simply visit and view our website, but to access and avail the
              Services being offered, you will need to create a
              password-protected account (“Account”). During the registration
              process you are also required to submit your personal information,
              which may include information relating to your name, age, school,
              class and location, among other things. You agree that the
              information provided by you upon registration and at all times
              thereafter will be true, accurate, current and complete. You agree
              to maintain and update this information to keep it true, accurate
              and complete at all times while using the Services.
            </p>
            <p>
              By sharing your email address &amp; phone number with us, you
              consent to be contacted by us via phone calls, SMS notifications,
              email, and/or any other electronic mode of communication in case
              of upcoming events, program updates and deadline.
            </p>
            <p>
              You are solely responsible for safeguarding your password
              (&quot;Password&quot;) at all times and shall keep your Password
              secure at all times. You shall be solely responsible for all
              activity that occurs on your Account and you shall notify us
              immediately of any breach of security or any unauthorized use of
              your Account. Similarly, you shall never use another&#39;s Account
              without our permission. You agree that you will not misrepresent
              yourself or represent yourself as another user of the Services.
              You hereby expressly acknowledge and agree that you yourself will
              be liable for your losses, damages and expenses (whether direct or
              indirect) caused by an unauthorized use of your Account.
              Notwithstanding the foregoing, you may be liable for our losses or
              others due to such unauthorized use.
            </p>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            User Content
          </div>

          <div className=" text-md p-4  text-gray-700">
            The Services enable you to share your content, such as homework,
            quizzes, assessments, projects, and other assignments you submit,
            posts you make in the forums, and the like (&quot;User
            Content&quot;), with Nirmaan Learning Platform, instructors, and/or
            other users. You retain all intellectual property rights in, and are
            responsible for, the User Content you share. We are not responsible
            for any actions you take with respect to the User Content, including
            sharing it publicly. Further, you are not permitted to use another
            user’s User Content without such user’s express consent.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            How Nirmaan Learning Platform and Others May Use User Content
          </div>

          <div className=" text-md p-4 lowercase text-gray-700">
            To the extent that you provide User Content, you grant Nirmaan
            Learning Platform a fully-transferable, royalty-free, perpetual,
            sub-licensable, non-exclusive, worldwide license to copy,
            distribute, modify, create derivative works based on, publicly
            perform, publicly display, and otherwise use the User Content. This
            license includes granting Nirmaan Learning Platform the right to
            authorize institutions offering courses as part of the Services, to
            use User Content with their registered students and on-campus
            learners independent of the Services. To clarify, this license
            continues even after you stop using the Services. Nothing in these
            Terms shall restrict other legal rights Nirmaan Learning Platform
            may have to User Content. We reserve the right to remove or modify
            User Content for any reason, including User Content that we believe
            violates these Terms. To the extent that instructors and/ or other
            users use User Content in a manner not authorized by you or by
            Nirmaan Learning Platform, we shall hold no responsibility and shall
            bear no liability for any loss, damage or expenses suffered or
            incurred by you owing to misuse or User Content or breach of your
            intellectual property rights over the User Content.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Capstone Project
          </div>

          <div className=" text-md p-4  text-gray-700">
            During your learning journey with us, Nirmaan Learning Platform may
            conduct Capstone Projects as a part of your learning curriculum to
            enable you to address practical problems relevant to your Program
            ("Problem"). Such Problems may either be provided by Nirmaan
            Learning Platform or you may also propose certain problems from your
            end for you to work upon. You will be free to deploy Nirmaan
            Learning Platform's resources and guidance from Nirmaan Learning
            Platform's mentors and faculty members to resolve the problem
            ("Solution"). Accordingly, notwithstanding anything stated in the
            aforementioned sections of 'User Content' and 'How Nirmaan Learning
            Platform and Others May Use User Content', following terms and
            conditions shall be applicable to the Capstone Projects:
          </div>

          <div className="px-14 space-y-2 text-md text-gray-700">
            <ol class=" space-y-2">
              <li>
                If the Problem is provided by Nirmaan Learning Platform, then
                Nirmaan Learning Platform shall exclusively retain all the
                intellectual property rights to such Problem for perpetuity.
                Furthermore, Nirmaan Learning Platform shall also own all the
                intellectual property rights to the Solution of such Problem
                devised by you and shall have the right to otherwise use the
                Solution in any manner as Nirmaan Learning Platform may deem
                fit. You shall have the right to exhibit the Problem and the
                Solution to demonstrate your skills for career growth and
                progression, however, you shall not exploit the Problem and/or
                the Solution for any commercial purpose, whatsoever.
              </li>
              <li>
                If the Problem is open source or is procured from an
                unidentifiable source, then unless expressly precluded, you and
                Nirmaan Learning Platform shall jointly own all the intellectual
                property rights in the Problem and the Solution. Accordingly,
                Nirmaan Learning Platform shall have a fully-transferable,
                royalty-free, perpetual, sub-licensable, worldwide right to
                copy, distribute, modify, create derivative works based on,
                publicly perform, publicly display, and otherwise use the
                Problem and the Solution. If you wish to assign / license or
                otherwise utilise any of your intellectual property rights to
                the Solution, you shall give a prior written notice to Nirmaan
                Learning Platform in this regard.
              </li>
              <li>
                If the Problem is procured by you and/or from any third-party
                source, you shall disclose the source of the Problem to Nirmaan
                Learning Platform. Nirmaan Learning Platform shall have a right
                to list the Problem in your personal e-portfolio hosted on its
                website and retain it as part of its academic records.
                Furthermore, unless expressly precluded, the intellectual
                property rights in the Solution to the Problem shall be jointly
                owned by you and Nirmaan Learning Platform. Accordingly, the
                rights of Nirmaan Learning Platform on the Problem and the
                Solution, as mentioned in point 2 of this Section above, shall
                respectively apply to the Solution for such Problems.
              </li>
            </ol>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Feedback
          </div>

          <div className=" text-md p-4  text-gray-700">
            We welcome your suggestions, ideas, comments, and other feedback
            regarding the Services ("Feedback"). By submitting any Feedback, you
            grant us the right to use the Feedback without any restriction or
            any compensation to you. By accepting your Feedback, Nirmaan
            Learning Platform does not waive any rights to use similar or
            related Feedback previously known to Nirmaan Learning Platform,
            developed by its employees or contractors, or obtained from other
            sources.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Security
          </div>

          <div className=" text-md p-4  text-gray-700">
            We care about the security of our users. While we work to protect
            the security of your Account and related information, Nirmaan
            Learning Platform cannot guarantee that unauthorized third parties
            will not be able to defeat our security measures. Please notify us
            immediately of any compromise or unauthorized use of your Account.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Third Party Content
          </div>

          <div className=" text-md p-4  text-gray-700">
            Through the Services, you will have the ability to access and/or use
            content provided by instructors of programs offered as part of the
            Services, other users, and/or other third parties and links to
            websites and services maintained by third parties. Nirmaan Learning
            Platform cannot guarantee that such third-party content, in the
            Services or elsewhere, will be free of material you may find
            objectionable or otherwise inappropriate or of malware or other
            contaminants that may harm your computer, mobile device, or any
            files therein. Nirmaan Learning Platform disclaims any
            responsibility or liability related to your access or use of such
            third-party content. It is clarified that Nirmaan Learning Platform
            does not have a principal-agent or employer-employee relationship
            with any instructor, user or third party and shall not have bear any
            liability or responsibility on behalf of such persons / entities.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Modifying and Terminating our Services
          </div>

          <div className=" text-md p-4  text-gray-700">
            We are constantly changing and improving our Services. We may add or
            remove functions, features, or requirements, and we may suspend or
            stop a Service altogether. Accordingly, Nirmaan Learning Platform
            may terminate your use of any Service for any reason. Nirmaan
            Learning Platform and its directors, instructors, its contributors,
            sponsors, and other business partners, and their employees,
            officers, staff, contractors, and other agents (the "Nirmaan
            Learning Platform Parties") shall not have any liability to you for
            any such action. You can stop using our Services at any time. We may
            also terminate your access to our Services if it comes to our
            knowledge that you have violated any of these Terms, our Privacy
            Policy, any other applicable policies or agreements between us, or
            any applicable laws. In this regard, we may further take any such
            necessary action, including legal recourse and removal of any
            non-compliant information shared by you.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Disclaimers
          </div>

          <div className=" text-md p-4  text-gray-700">
            The services and all included content are provided on an "As is"
            basis without warranty of any kind, whether express or implied. The
            Nirmaan Learning Platform parties specifically disclaim any and all
            warranties and conditions of merchantability, fitness for a
            particular purpose, and non-infringement, and any warranties arising
            out of course of dealing or usage of trade, whether express or
            implied. The Nirmaan Learning Platform parties further disclaim any
            and all liability related to your access or use of the services or
            any related content. You acknowledge and agree that any access to or
            use of the services or such content is at your own risk.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Limitation of Liability
          </div>

          <div className=" text-md p-4  text-gray-700 space-y-3">
            <p>
              To the maximum extent permitted by law, the Nirmaan Learning
              Platform parties shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of
              profits or revenues, lost business opportunities, whether incurred
              directly or indirectly, or any loss of data, use, goodwill, or
              other intangible losses, resulting from: (a) your access to or use
              of or inability to access or use the services; (b) any conduct or
              content of any party other than the applicable Nirmaan Learning
              Platform party, including without limitation, any defamatory,
              offensive, or illegal conduct; (c) unauthorized access, use, or
              alteration of your content or information; (d) these terms; or (e)
              act, omission or negligence to which you contributed. In no event
              shall Nirmaan Learning Platform's aggregate liability for all
              claims related to the services exceed one thousand Indian Rupees
              (1000 INR).
            </p>

            <p>
              You acknowledge and agree that the disclaimers and the limitations
              of liability set forth in these terms of use reflect a reasonable
              and fair allocation of risk between you and the Nirmaan Learning
              Platform parties, and that these limitations are an essential
              basis to Nirmaan Learning Platform's ability to make the services
              available to you on an economically feasible basis.
            </p>
            <p>
              You agree that any cause of action related to the services must
              commence within one (1) year after the cause of action accrues.
              Otherwise, such cause of action is permanently barred.
            </p>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Indemnification
          </div>

          <div className=" text-md p-4  text-gray-700">
            You agree to indemnify, defend, and hold harmless the Nirmaan
            Learning Platform Parties from any and all claims, liabilities,
            expenses, and damages, including reasonable attorneys' fees and
            costs, made by any third party related to: (a) your use or attempted
            use of the Services in violation of these Terms; (b) your violation
            of any law or rights of any third party; or (c) User Content,
            including without limitation any claim of infringement or
            misappropriation of intellectual property or other proprietary
            rights.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Governing Law and Jurisdiction
          </div>

          <div className=" text-md p-4  text-gray-700 space-y-3">
            <p>
              The Services are managed by Nirmaan Learning Platform, which is
              located in Hyderabad, India. You agree that any dispute related to
              these Terms will be governed by the laws of the State of
              Telangana, excluding its conflicts of law provisions. You further
              consent to the personal jurisdiction of and exclusive venue in the
              national and state courts located in and serving Telangana as the
              legal forum for any such dispute.
            </p>
            <p>
              Excluding claims for injunctive or other equitable relief, either
              you or Nirmaan Learning Platform may elect at any point during the
              dispute to resolve the claim through binding, non-appearance-based
              arbitration. The dispute will then be resolved using an
              established alternative dispute resolution ("ADR") provider,
              mutually agreed upon by you and Nirmaan Learning Platform. The
              parties and the selected ADR provider shall not involve any
              personal appearance by the parties or witnesses, unless otherwise
              mutually agreed by the parties; rather, the arbitration shall be
              conducted, at the option of the party seeking relief, online, by
              telephone, or via written submissions alone. Any judgment rendered
              by the arbitrator may be entered in any court of competent
              jurisdiction.
            </p>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Revisions to the Terms
          </div>

          <div className=" text-md p-4  text-gray-700">
            We reserve the right to revise the Terms at our sole discretion at
            any time. Any revisions to the Terms will be effective immediately
            upon posting by us. In all cases, your continued use of the Services
            after publication of such changes, with or without notification,
            constitutes binding acceptance of the revised Terms. Severability
            and Waiver If it turns out that a particular provision of these
            Terms is not enforceable, this will not affect any other terms. If
            you do not comply with these Terms, and we do not take immediate
            action, this does not indicate that we relinquish any rights that we
            may have (such as taking action in the future).
          </div>
          <div className=" text-md p-4  text-gray-700">
            We reserve the right to revise the Terms at our sole discretion at
            any time. Any revisions to the Terms will be effective immediately
            upon posting by us. In all cases, your continued use of the Services
            after publication of such changes, with or without notification,
            constitutes binding acceptance of the revised Terms. Severability
            and Waiver If it turns out that a particular provision of these
            Terms is not enforceable, this will not affect any other terms. If
            you do not comply with these Terms, and we do not take immediate
            action, this does not indicate that we relinquish any rights that we
            may have (such as taking action in the future).
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Acceptable Use Policy
          </div>

          <div className=" text-md p-4  text-black font-bold">
            You are prohibited from using our Services to share content that:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2">
              <li>Is harmful to child.</li>
              <li>
                Contains illegal content or promotes illegal activities with the
                intent to commit such activities. Please keep in mind that
                learners who are as young as 13 use Nirmaan Learning Platform,
                and we do not allow content that is inappropriate for these
                younger learners.
              </li>
              <li>
                Contains credible threats or organizes acts of real-world
                violence. We do not allow content that creates a genuine risk of
                physical injury or property damage, credibly threatens people or
                public safety, or organizes or encourages harm.
              </li>
              <li>
                Harasses others. We encourage commentary about people and
                matters of public interest, but abusive or otherwise
                inappropriate content directed at private individuals is not
                allowed.
              </li>
              <li>
                Violates intellectual property, privacy, or other rights. Do not
                share content that you do not have the right to share, claim
                content that you did not create as your own, or otherwise
                infringe or misappropriate someone else’s intellectual property
                or other rights. Always attribute materials used or quoted by
                you to the original copyright owner.
              </li>
              <li>
                Is patently false and untrue, and is written or published in any
                form, with the intent to mislead or harass a person, entity or
                agency for financial gain or to cause any injury to any person.
              </li>
              <li>
                Deceives or misleads the addressee about the origin of the
                message/content or knowingly and intentionally communicates any
                information which is patently false or misleading in nature but
                may reasonably be perceived as a fact; or communicates any
                information which is grossly offensive or menacing in nature.
              </li>
              <li>
                Contains software virus or any other computer code, file or
                program designed to interrupt, destroy or limit the
                functionality of any computer resource.
              </li>
              <li>
                Is grossly harmful, harassing, blasphemous defamatory, obscene,
                pornographic, pedophilic, libelous, invasive of another's
                privacy, hateful, or racially, ethnically objectionable,
                disparaging, relating or encouraging money laundering or
                gambling, or otherwise unlawful in any manner whatsoever.
              </li>
              <li>
                Threatens the unity, integrity, defence, security or sovereignty
                of India, friendly relations with foreign states, or public
                order or causes incitement to the commission of any cognizable
                offence or prevents investigation of any offence or is insulting
                any other nation.
              </li>
              <li>
                Spams others. Do not share irrelevant or inappropriate
                advertising, promotional, or solicitation content.
              </li>
              <li>
                Otherwise violates these Terms. Please note that specific
                courses offered as part of the Services may have additional
                rules and requirements.
              </li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
            </ul>
          </div>

          <div className=" text-md p-4  text-black font-bold">
            You also are not permitted to:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class="  space-y-2">
              <li>
                Do anything that violates local, state, national or
                international law or breaches any of your contractual
                obligations or fiduciary duties.
              </li>
              <li>
                Share your password, let anyone access your Account, or do
                anything that might put your Account at risk.
              </li>
              <li>Attempt to access any other user's Account.</li>
              <li>
                Reproduce, transfer, sell, resell, or otherwise misuse any
                content from our Services, unless specifically authorized to do
                so.
              </li>
              <li>
                Access, tamper with, or use non-public areas of our systems,
                unless specifically authorized to do so.
              </li>
              <li>
                Break or circumvent our authentication or security measures or
                otherwise test the vulnerability of our systems or networks,
                unless specifically authorized to do so.
              </li>
              <li>Try to reverse engineer any portion of our Services.</li>
              <li>Use our Services to distribute malware.</li>
              <li>
                Impersonate or misrepresent your affiliation with any person or
                entity.
              </li>
              <li>
                Encourage or help anyone do any of the things on this list.
              </li>
              <li>
                Spams others. Do not share irrelevant or inappropriate
                advertising, promotional, or solicitation content.
              </li>
              <li>
                Otherwise violates these Terms. Please note that specific
                courses offered as part of the Services may have additional
                rules and requirements.
              </li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
            </ul>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Acceptable Use Policy
          </div>

          <div className=" text-md p-4  text-black font-bold">
            You are prohibited from using our Services to share content that:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2">
              <li>Is harmful to child.</li>
              <li>
                Contains illegal content or promotes illegal activities with the
                intent to commit such activities. Please keep in mind that
                learners who are as young as 13 use Nirmaan Learning Platform,
                and we do not allow content that is inappropriate for these
                younger learners.
              </li>
              <li>
                Contains credible threats or organizes acts of real-world
                violence. We do not allow content that creates a genuine risk of
                physical injury or property damage, credibly threatens people or
                public safety, or organizes or encourages harm.
              </li>
              <li>
                Harasses others. We encourage commentary about people and
                matters of public interest, but abusive or otherwise
                inappropriate content directed at private individuals is not
                allowed.
              </li>
              <li>
                Violates intellectual property, privacy, or other rights. Do not
                share content that you do not have the right to share, claim
                content that you did not create as your own, or otherwise
                infringe or misappropriate someone else’s intellectual property
                or other rights. Always attribute materials used or quoted by
                you to the original copyright owner.
              </li>
              <li>
                Is patently false and untrue, and is written or published in any
                form, with the intent to mislead or harass a person, entity or
                agency for financial gain or to cause any injury to any person.
              </li>
              <li>
                Deceives or misleads the addressee about the origin of the
                message/content or knowingly and intentionally communicates any
                information which is patently false or misleading in nature but
                may reasonably be perceived as a fact; or communicates any
                information which is grossly offensive or menacing in nature.
              </li>
              <li>
                Contains software virus or any other computer code, file or
                program designed to interrupt, destroy or limit the
                functionality of any computer resource.
              </li>
              <li>
                Is grossly harmful, harassing, blasphemous defamatory, obscene,
                pornographic, pedophilic, libelous, invasive of another's
                privacy, hateful, or racially, ethnically objectionable,
                disparaging, relating or encouraging money laundering or
                gambling, or otherwise unlawful in any manner whatsoever.
              </li>
              <li>
                Threatens the unity, integrity, defence, security or sovereignty
                of India, friendly relations with foreign states, or public
                order or causes incitement to the commission of any cognizable
                offence or prevents investigation of any offence or is insulting
                any other nation.
              </li>
              <li>
                Spams others. Do not share irrelevant or inappropriate
                advertising, promotional, or solicitation content.
              </li>
              <li>
                Otherwise violates these Terms. Please note that specific
                courses offered as part of the Services may have additional
                rules and requirements.
              </li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
            </ul>
          </div>

          <div className=" text-md p-4  text-black font-bold">
            You also are not permitted to:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class="  space-y-2">
              <li>
                Do anything that violates local, state, national or
                international law or breaches any of your contractual
                obligations or fiduciary duties.
              </li>
              <li>
                Share your password, let anyone access your Account, or do
                anything that might put your Account at risk.
              </li>
              <li>Attempt to access any other user's Account.</li>
              <li>
                Reproduce, transfer, sell, resell, or otherwise misuse any
                content from our Services, unless specifically authorized to do
                so.
              </li>
              <li>
                Access, tamper with, or use non-public areas of our systems,
                unless specifically authorized to do so.
              </li>
              <li>
                Break or circumvent our authentication or security measures or
                otherwise test the vulnerability of our systems or networks,
                unless specifically authorized to do so.
              </li>
              <li>Try to reverse engineer any portion of our Services.</li>
              <li>Use our Services to distribute malware.</li>
              <li>
                Impersonate or misrepresent your affiliation with any person or
                entity.
              </li>
              <li>
                Encourage or help anyone do any of the things on this list.
              </li>
              <li>
                Spams others. Do not share irrelevant or inappropriate
                advertising, promotional, or solicitation content.
              </li>
              <li>
                Otherwise violates these Terms. Please note that specific
                courses offered as part of the Services may have additional
                rules and requirements.
              </li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit</li>
            </ul>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Copyright and Trademark Policy
          </div>

          <div className=" text-md p-4  text-gray-700">
            Nirmaan Learning Platform respects the intellectual property rights
            of our instructors, and other third parties and expects our users to
            do the same when using the Services. We reserve the right to
            suspend, disable, or terminate the Accounts of users who infringe or
            are charged with infringing the copyrights, trademarks, or other
            intellectual property rights of others.
          </div>

          <div className=" text-md p-4  text-gray-700">
            If you believe in good faith that materials on the Services infringe
            your copyright, you may notify us by email and we will review your
            complaint. If we deem appropriate, we may remove the offending
            content, warn the individual who posted the content, and/or take
            other appropriate actions and communicate the same to you.
          </div>

          <div className=" text-md p-4  text-black font-bold">
            The email complaint must include the following information:
          </div>

          <div className="py-1 px-14">
            <ol class="  space-y-2 text-gray-700">
              <li>
                The physical or electronic signature of a person authorized to
                act on behalf of the owner of an exclusive right that is
                allegedly infringed;
              </li>
              <li>
                Identification of the copyrighted work claimed to have been
                infringed (or, if multiple copyrighted works located on the
                services are covered by a single notification, a representative
                list of such works);
              </li>
              <li>
                Identification of the material that is claimed to be infringing
                or the subject of infringing activity, and information
                reasonably sufficient to allow nirmaan learning platform to
                locate the material on the services;
              </li>
              <li>
                The name, address, telephone number, and email address (if
                available) of the complaining party;
              </li>
              <li>
                A statement that the complaining party has a good faith belief
                that use of the material in the manner complained of is not
                authorized by the copyright owner, its agent, or the law; and
              </li>
              <li>
                A statement that the information in the notification is accurate
                and, under penalty of perjury, that the complaining party is
                authorized to act on behalf of the owner of an exclusive right
                that is allegedly infringed.
              </li>
            </ol>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Privacy
          </div>

          <div className=" text-md p-4  text-gray-700">
            By using the Services, you agree to our Privacy Policy, the terms of
            which are incorporated into, and form a crucial part of, these
            Terms. Our Privacy Policy sets out the terms on which we process any
            personal or financial data we collect from you, or that you provide
            to us. Our Privacy Policy shall also apply to your use of our
            website and by using our website, you consent to such processing and
            you warrant that all data provided by you is accurate.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Force Majeure
          </div>

          <div className=" text-md p-4  text-gray-700">
            Neither of us shall be liable to the other for any delay or failure
            in performance under these Terms, other than payment obligations,
            arising out of a cause beyond its control and without its fault or
            negligence. Such causes may include, but are not limited to fires,
            floods, earthquakes, strikes, unavailability of necessary utilities,
            blackouts, acts of God, acts of declared or undeclared war, acts of
            regulatory agencies, or national disasters.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Grievance Redressal
          </div>

          <div className=" text-md p-4  text-black font-bold">
            The email complaint must include the following information:
          </div>

          <div className="py-4 px-14 space-y-2 font-bold">
            <p>Name: </p>
            <p>E-mail id: </p>
            <p>
              All the grievances and any discrepancies of the provider of
              information shall be redressed within one month (30 days) from the
              date of receipt of grievance.
            </p>
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
