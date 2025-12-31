import controller.RainwaterController;

public class Application {
    public static void main(String[] args) {

        RainwaterController controller =
                new RainwaterController();

        System.out.println(
            controller.getResult(
                "Rajasthan",
                "Jaipur",
                50,
                5,
                100,
                "Tiled"
            )
        );
    }
}


