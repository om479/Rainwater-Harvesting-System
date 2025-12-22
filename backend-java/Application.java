import controller.RainwaterController;
import model.RainwaterResult;

public class Application {

    public static void main(String[] args) {

        RainwaterController controller = new RainwaterController();

        RainwaterResult result = controller.getResult(
                "Maharashtra",
                "Pune",
                2022,
                60,
                4,
                135,
                "GI Sheet",
                1100
        );

        System.out.println("State: Maharashtra");
        System.out.println("City: Pune");
        System.out.println("Year: 2022");
        System.out.println("Annual Harvested Water: "
                + result.getAnnualHarvestedWater() + " L");
        System.out.println("Daily Water Need: "
                + result.getDailyWaterNeed() + " L/day");
        System.out.println("Annual Water Need: "
                + result.getAnnualWaterNeed() + " L/year");
    }
}

