package controller;

import model.RainwaterInput;
import model.RainwaterResult;
import service.RainwaterService;

public class RainwaterController {

    private RainwaterService service = new RainwaterService();

    public RainwaterResult getResult(
            String state,
            String city,
            int year,
            double roofArea,
            int familyMembers,
            double perCapitaWaterUsage,
            String roofMaterial,
            double annualRainfallMm
    ) {

        RainwaterInput input = new RainwaterInput(
                state,
                city,
                roofArea,
                familyMembers,
                perCapitaWaterUsage,
                roofMaterial,
                annualRainfallMm
        );

        return service.calculateResults(input);
    }
}

