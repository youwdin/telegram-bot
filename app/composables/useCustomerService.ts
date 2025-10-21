import type { BHeroRegisterFormRequest } from "~/types/BHeroRegisterFormRequest";
import type { BPreneurRegisterFormRequest } from "~/types/BPreneurRegisterFormRequest";

export const useCustomerService = () => {
    const bheroRegisterFormSubmit = async (request: BHeroRegisterFormRequest) => {
        const response = await fetch("/biru-api/api/v1/customer/bheroRegisterForm", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return response.json();
    }

    const bpreneurRegisterFormSubmit = async (request: BPreneurRegisterFormRequest) => {
        const response = await fetch("/biru-api/api/v1/customer/bpreneurRegisterForm", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        return response.json();
    }

    return { bheroRegisterFormSubmit, bpreneurRegisterFormSubmit };
};
