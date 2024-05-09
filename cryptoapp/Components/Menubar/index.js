import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarCheckboxItem,
} from "../ui/menubar";

export function MenuBar() {
  return (
    <Menubar className="hidden sm:flex">
      <MenubarMenu>
        <MenubarTrigger>Log In</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Sign Up</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>AUD</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>USD - U.S. Dollar</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>CAD - Canadian Dollar</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>EUR - Euro</MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Language</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Espanol</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>English</MenubarCheckboxItem>
          <MenubarCheckboxItem>Esperanto</MenubarCheckboxItem>
          <MenubarCheckboxItem>Klingon</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
