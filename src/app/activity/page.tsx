import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Header, ActivityHeader } from "@/features/header";

const activityArray = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const Activity = () => {
  return (
    <div>
      <Header>
        <ActivityHeader />
      </Header>
      <Card className="w-100 b-0 mx-2 p-1">
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Activity
              </p>
              <p className="text-muted-foreground text-sm">
                Send activity to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {activityArray.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Mark all as read</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Activity;

export const metadata = {
  title: "Activity",
};
