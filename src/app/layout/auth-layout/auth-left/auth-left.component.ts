import { Component } from "@angular/core";
import { Slide } from "../../../core/modules/shared/components/carousel/carousel.component";

@Component({
    selector: "app-auth-left",
    templateUrl: "./auth-left.component.html",
    styleUrls: ["./auth-left.component.scss"],
})
export class AuthLeftComponent {
    slides: Slide[] = [
        {
            heading: "Unlock Your Full Potential with Our Industry-Relevant Courses",
            text: "Discover your hidden talents and achieve your career goals with our comprehensive learning programs.",
        },
        {
            heading: "Experience Personalized Learning Solutions with Our User-Friendly Platform",
            text: "Take advantage of our tailored learning experiences and advance your career at your own pace.",
        },
        {
            heading: "Innovative Learning Approach to Develop Real-World Skills",
            text: "Our practical simulations and interactive modules help you acquire the knowledge you need to succeed in your career.",
        },
        {
            heading: "Learn from Industry Professionals with Years of Experience",
            text: "Our courses are led by experts in their fields, providing you with valuable insights and mentorship opportunities.",
        },
        {
            heading: "Flexible Scheduling Options to Fit Your Busy Lifestyle",
            text: "Choose from a range of scheduling options to suit your learning style and career objectives.",
        },
        {
            heading: "Collaborative Learning Environment to Expand Your Network",
            text: "Engage with peers and experts to enhance your learning experience and build valuable connections in your industry.",
        },
        {
            heading: "Career-Focused Curriculum to Boost Your Employability",
            text: "Our courses are designed to equip you with the skills and knowledge you need to excel in your chosen profession.",
        },
        {
            heading: "Enhance Your Professional Profile with Our Accredited Courses",
            text: "Our industry-recognized certifications and qualifications enhance your credibility and help you stand out in a competitive job market.",
        },
        {
            heading: "Gain Access to Exclusive Industry Insights and Resources",
            text: "Our learning management system provides you with a wealth of industry-specific resources and insights to help you stay ahead of the curve.",
        },
    ];

    constructor() {}
}
