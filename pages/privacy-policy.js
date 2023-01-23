import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

export default function PrivacyPolicy() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Privacy Policy - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}

      <div className="px-3 md:px-10 lg:px-20 xl:px-30 py-24 bg-white">
        <div className="prose prose-lg mx-auto max-w-7xl rounded-2xl">
          <div className="p-4 flex justify-center items-center text-3xl font-serif">
            PRIVACY POLICY
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Our Privacy Policy is fueled by our commitment to these Privacy
            Principles:
          </div>

          <div className="px-14 space-y-2 text-md text-gray-700">
            <ol class=" space-y-2">
              <li>
                We’re committed to creating a safe and secure online environment
                for you.
              </li>
              <li>
                We do not sell your personal information to third parties. We
                established Nirmaan Learning Platform as a nonprofit
                organization so that our mission of education and your trust
                will not be in conflict with a for-profit motive.
              </li>
              <li>
                We strive to provide you with access to and control over the
                information you give us, and we take the protection of your
                information very seriously.
              </li>
              <li>
                We take extra precautions for our younger learners as described
                in our Children’s Privacy Notice.
              </li>
              <li>
                Our mission is to provide you with a world class education.
              </li>
            </ol>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Overview
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Portal, Inc. (“Nirmaan Learning Portal”, “our”,
            “us”, or “we”) is an Indian-based NGO. We use the information we
            collect to provide you with a better experience and fulfill our
            mission of providing a free, world-class education for anyone,
            anywhere.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            We are committed to protecting your privacy. We understand how
            important privacy is to you, and we are committed to protecting your
            privacy and to creating a safe and secure environment for learners
            of all ages. This Privacy Policy explains how information is
            collected, used, shared, and protected by Nirmaan Learning Platform.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Note: For each section in this Privacy Policy, you can view the
            general privacy practices at the beginning of the section, and see
            more information by reviewing “Learn More” for the relevant section.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Use by Children and Students
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            For specific information about how we collect, use, and process
            personal information when providing the Portal to schools, school
            districts, and teachers, please review the School and Student
            Section.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Collection of information
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            We collect information in the following ways, depending on your use
            of the Portal and your account settings:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>
                We collect information from you directly, such as when you
                create an account, communicate with us, participate in
                activities, enroll for a course, or otherwise provide
                information during your use of the Portal.
              </li>
              <li>
                We may collect information from others, such as your parent,
                teacher, or School, or third parties (meaning organizations
                outside of Nirmaan Learning Portal), such as third-party
                applications that you use to connect to the Portal.
              </li>
            </ul>
          </div>

          <div className=" text-md p-4  text-gray-700">
            Examples of information we may collect includes:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>
                Account registration information (username, school, class,
                location and email).
              </li>
              <li>
                Information about your browser or device, and general location.
              </li>
              <li>
                Information you choose to include in your profile or post in
                public areas of the Portal.
              </li>
              <li>
                Non-personal information which may be linked to your personal
                information, including Information about your use of our Portal.
              </li>
            </ul>
          </div>

          <div className=" text-md p-4  text-gray-700">
            Nirmaan Learning Platform uses information collected for the
            purposes of:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>providing the Portal.</li>
              <li>personalizing your experience.</li>
              <li>communicating with you about your account and our Portal.</li>
              <li>
                enabling your participation in special programs that we may
                offer in partnerships with third parties.
              </li>
              <li>
                understanding and improving our Portal, and developing new or
                improved educational offerings.
              </li>
              <li>connecting weekly for clarifications of doubts.</li>
            </ul>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Sharing and disclosure of information
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Platform takes great care to protect the personal
            information you provide to us. We do not sell your personal
            information to third parties. This section explains circumstances in
            which we may share personal information with third parties.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            We may share personal information:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2">
              <li>
                with other users of our Portal, if you use features that enable
                you to share your information with (or make it accessible to)
                others.
              </li>
              <li>
                with donors and other Portal providers working on our behalf.
              </li>

              <li>
                with other users that are associated with your account, such as
                a parent, teacher or trainer.
              </li>
              <li>
                with your school, if you are using our Portal for school
                purposes .
              </li>
              <li>
                for compliance purposes, such as when reasonably necessary to
                protect the security and safety of our users or Portal, or when
                permitted by law.
              </li>
            </ul>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Sponsorship and Advertising
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            As a nonprofit organization, Nirmaan Learning Platform relies on our
            sponsors, donors, and other contributors to provide funding
            necessary to provide the free Portal to our users. From time to
            time, we permit third parties to sponsor content displayed on our
            Portal.
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>
                For example, for-profit organizations may wish to sponsor all
                content related to a particular educational topic.
              </li>
              <li>
                Nirmaan Learning Platform does not share any of your personal
                information with these sponsors without your consent. We do not
                provide these sponsors with the ability to track or collect
                information about our site visitors or users.
              </li>
            </ul>
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Platform does not display third party
            advertisements on our Portal. We may, from time to time, incorporate
            content or link to content provided by third parties that may be of
            interest to you and relevant to the educational context of our
            Portal. Some of these materials or websites may include branding or
            advertisements as permitted by the third-party owner or operator.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Please note that we use our best efforts and take multiple steps to
            avoid the collection of information for targeted advertising
            purposes when we believe the Portal is being used by Students or
            Children.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Your account settings
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            We want you to have access to your information, so that you can help
            keep it as accurate as possible. If you register and provide Nirmaan
            Learning Platform with information, you may update or correct your
            account and information at any time by reviewing your profile
            information and preferences on your account settings page.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Security of your personal information
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Platform is committed to securing your personal
            information. Some of the ways in which we protect your personal
            information include:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>
                We encrypt your personal information when it is stored at rest.
              </li>
              <li>
                We protect your personal information with encryption during
                transmission over the public Internet.
              </li>
              <li>
                We use reasonable organizational and technical safeguards
                designed to help protect the privacy and security of your
                personal information.
              </li>
            </ul>
          </div>

          <div className=" text-md p-4  text-gray-700">
            Some of the ways in which we encourage you to protect your personal
            information include:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>
                We encourage you to create a username that does not reveal your
                identity.
              </li>
              <li>We encourage you to create (and keep) a strong password.</li>
              <li>
                {" "}
                We encourage you to be thoughtful about what you post and
                continue to learn about online safety.
              </li>
            </ul>
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            We use reasonable safeguards to protect our Portal and your personal
            information, but no security measures are perfect.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Links to Third Parties
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            The Portal may link to and may be linked by websites operated by
            other entities or individuals. If we include links to third-parties
            and you click on that link, you will be leaving Nirmaan Learning
            Platform and the privacy policy of that third-party applies.
            Similarly, if you see a link to Nirmaan Learning Platform on a
            third-party website, then the privacy policy of that third party
            applies.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Changes to this Privacy Policy
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Platform may modify or revise this Privacy Policy
            from time to time. Nirmaan Learning Platform will notify users of
            any changes to our Privacy Policy by posting the revised Privacy
            Policy with an updated date of revision on our Portal. If we change
            this Policy in a material manner, we will do our best to notify you
            of the changes by posting a notice on our website. We recommend that
            you review the Privacy Policy each time you visit the Portal to stay
            informed of our privacy practices. We will not make any material
            changes to our Privacy Policy that relate to the collection or use
            of Student Personal Data without first giving notice to the school
            and providing a choice before Student Personal Data are used in a
            materially different manner than was disclosed when the information
            was collected.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Contact Nirmaan Learning Portal
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Please contact Nirmaan Learning Platform with any questions or
            comments. By mail: Nirmaan Learning Portal, Flat No: 401, Nirmaan
            Organization, Jai Hind Enclave, Madhapur, Hyderabad, Telangana -
            500081
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline text-justify">
            Schools and Student Use
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Nirmaan Learning Platform is a nonprofit organization dedicated to
            providing free educational content. We strive to implement best
            practices to protect the privacy of all of our student and
            non-student users, alike. We have implemented additional controls
            and procedures for schools, school districts and teachers
            (collectively referred to as “Schools”) when they use the Portal for
            educational purposes. When the Portal is used as part of the
            school’s educational program, the personal information related to
            the school’s student users (“School Users”) may include information
            defined as “education records” or other information protected by
            similar state student data privacy laws. We refer to this
            information as “Student Personal Data”.
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Children’s Privacy Notice
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            This privacy notice supplements our Privacy Policy and provides
            additional information about how we collect, use and share personal
            information from children under the age of 13 (a “Child” or
            “Children”).
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Nirmaan Learning Platform is committed to Children’s privacy.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Protecting the privacy of Children is especially important to
            Nirmaan Learning Portal. For that reason, we created certain
            features designed to help protect personal information relating to
            Children (“Child Users”). When a Child creates an account, we seek
            the consent of a parent or legal guardian (“Parent”) for that
            account. When Nirmaan Learning Platform is used by a School in an
            educational setting, we rely on the school to provide the requisite
            consent, on behalf of the Parent, for Nirmaan Learning Platform to
            collect information from a School User under the age of 13.
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            Please review “Learn More” for more information about:
          </div>

          <div className="py-1 px-14 text-gray-700">
            <ul class=" space-y-2 text-justify">
              <li>How Children can use and register for our Portal.</li>
              <li>Restrictions placed on Accounts for Child Users.</li>
              <li>Information collected and how the information is used.</li>
              <li>Information disclosed.</li>
              <li>No Third-Party Tracking and No Targeted Advertising.</li>
              <li>Choice: Access, Modify and Delete Child Accounts.</li>
            </ul>
          </div>

          <div className="heading p-4 flex justify-start items-center  text-3xl font-serif underline">
            Donor information
          </div>

          <div className=" text-md p-4  text-gray-700 text-justify">
            This Donor information notice supplements our Privacy Policy in
            connection with donors. If you donate to Nirmaan Learning Platform
            and do not donate anonymously, we obtain information such as your
            name, email address, and mailing address. If you donate using our
            online form, our payment processor will also collect your credit or
            debit card number or other payment information. Please note that
            information collected by these payment processors is subject to
            their own privacy policy. We may use donor information to
            communicate with you about your contribution and to send fundraising
            updates and information regarding the advancement of our mission. We
            do not share personally identifiable donor information except with
            your consent or as required by law. If you have registered for an
            account with us, then you may update your preferences in your
            account settings to opt out of donor emails. If you do not have an
            account with us, then you may opt out by clicking the unsubscribe
            link on the donor email message or responding back to the email
            asking to be removed. Please note that if you have previously
            unsubscribed but subsequently donate (or attend a donor event), then
            we may send you follow up communications regarding your support of
            our mission.
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
