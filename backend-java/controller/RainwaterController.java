package controller;

import dao.ReferenceDataDAO;
import model.RainwaterInput;
import model.RainwaterResult;
import service.RainwaterService;

public class RainwaterController {

    private final RainwaterService service = new RainwaterService();
    private final ReferenceDataDAO referenceDataDAO = new ReferenceDataDAO();

    public RainwaterResult getResult(
            String state,
            String city,
            double roofArea,
            int familyMembers,
            double perCapitaWaterUsage,
            String roofMaterial
    ) {
         // 1️⃣ Fetch rainfall from DB
        int cityId = referenceDataDAO.getCityId(state, city);
        double annualRainfallMm =
                referenceDataDAO.getAnnualRainfall(cityId);

        // 2️⃣ Create input with VALID rainfall
        RainwaterInput input = new RainwaterInput(
                state,
                city,
                roofArea,
                familyMembers,
                perCapitaWaterUsage,
                roofMaterial,
                annualRainfallMm
        );

        // 3️⃣ Calculate result
        return service.calculateResults(input);
    }
}
